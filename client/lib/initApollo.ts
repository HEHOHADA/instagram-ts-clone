import jwtDecode from 'jwt-decode'
import { NextPageContext } from 'next'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  split,
} from '@apollo/client'
import { isBrowser } from './isBrowser'
import { getAccessToken, setAccessToken } from './token'
import { isServer } from './withApollo'
import { cacheConfig } from './cacheConfig'
import Redirect from './redirect'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create(
    initialState: NormalizedCacheObject,
    ctx?: any,
    serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {

  const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  })

  const wsLink = () => new WebSocketLink({
    uri: `ws://localhost:4000/subscription`,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => ({
        authorization: `Bearer ${ getAccessToken() }`,
      })
    }
  })

  const refreshLink = new TokenRefreshLink({
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()
      if (!token) {
        return true
      }

      try {
        const {exp} = jwtDecode(token)
        return Date.now() < exp * 1000
      } catch {
        return false
      }
    },
    accessTokenField: 'accessToken',
    fetchAccessToken: () => {
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include'
      })
    },
    handleResponse: (_, accessTokenField) => async (response: any) => {
      const result = await response.json()
      return {
        [accessTokenField]: result[accessTokenField]
      }
    },
    handleFetch: accessTokenPayload => {
      setAccessToken(accessTokenPayload)
    },
    handleError: err => {
      console.error(err)
    }
  }) as ApolloLink

  const authLink = setContext((_req, {headers}) => {
    const token = isServer() ? serverAccessToken : getAccessToken()
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${ token }` : ''
      }
    }
  })


  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) => {
        console.log(
            `[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`)
        if (isBrowser && (message.includes('AuthenticationError') || message.includes('Access denied!'))) {
          // Router.replace('/accounts/login')
          Redirect(ctx, '/accounts/login')
        }
      })

    if (networkError) console.log(`[Network error]: ${ JSON.stringify(networkError) }`)
  })
  const ssrMode = Boolean(ctx)
  const link = ssrMode
      ? httpLink
      : isBrowser
          ? split(
              ({query}: any) => {
                const {kind, operation}: OperationVariables = getMainDefinition(query)
                return kind === 'OperationDefinition' && operation === 'subscription'
              },
              wsLink(),
              httpLink as any
          )
          : httpLink
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    link: ApolloLink.from([refreshLink, authLink, errorLink, link as ApolloLink]),
    cache: new InMemoryCache(cacheConfig)
        .restore(initialState || {})
  })
}

export default function initApollo(initialState: NormalizedCacheObject,
                                   ctx?: NextPageContext,
                                   serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  console.log('here', isServer() ? 'true' : 'false')
  if (isServer()) {
    return create(initialState, ctx, serverAccessToken)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx)
  }

  return apolloClient
}
