import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { isBrowser } from './isBrowser'
import { getAccessToken, setAccessToken } from './token'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create(initialState: any) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  })


  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()

      if (!token) {
        return true
      }

      try {
        const {exp} = jwtDecode(token)
        return Date.now() >= exp * 1000
      } catch {
        return false
      }
    },
    fetchAccessToken: () => {
      return fetch('htttp://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include'
      })
    },
    handleFetch: accessTokenPayload => {
      setAccessToken(accessTokenPayload)
    },
    handleError: err => {
      console.error(err)
    }
  })


  const authLink = setContext((_req, {headers}) => {
    const token = getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${ token }` : ''
      }
    }
  })


  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) => {
        console.log(
            `[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`)
        if (isBrowser && message.includes('not authenticated')) {
          Router.push('/accounts/login')
        }
      })

    if (networkError) console.log(`[Network error]: ${ networkError }`)
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
