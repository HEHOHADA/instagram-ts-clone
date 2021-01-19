import { NextPageContext } from 'next'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  split,
} from '@apollo/client'
import Redirect from './redirect'
import { isBrowser } from './isBrowser'
import { isServer } from './withApollo'
import { getAccessToken, setAccessToken } from './token'
import { authContextLink, cacheConfig, httpLinkWithUpload, refreshLink, wsLink } from '@instagram/common'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create(
  initialState: NormalizedCacheObject,
  ctx?: NextPageContext): ApolloClient<NormalizedCacheObject> {
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) => {
        console.log(
          `[GraphQL error]: Message: ${ message }, Location: ${ locations || 'not found' }, Path: ${ path }`)
        if ((message.includes('AuthenticationError') || message.includes('Access denied!'))) {
          Redirect(ctx, '/accounts/login')
        }
      })

    if (networkError) console.log(`[Network error]: ${ JSON.stringify(networkError) }`)
  })

  const ssrMode = Boolean(ctx)
  const linkHttp = ApolloLink.from([httpLinkWithUpload()])
  const link = ssrMode
    ? linkHttp
    : isBrowser
      ? split(
        ({query}: any) => {
          const {kind, operation}: OperationVariables = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink(`Bearer ${ getAccessToken() }`) as any,
        linkHttp
      )
      : linkHttp
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    link: ApolloLink.from([refreshLink(getAccessToken, setAccessToken), authContextLink(getAccessToken), errorLink, link]),
    cache: new InMemoryCache(cacheConfig)
      .restore(initialState || {})
  })
}

export default function initApollo(initialState: NormalizedCacheObject,
                                   ctx?: NextPageContext): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return create(initialState, ctx)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx)
  }

  return apolloClient
}
