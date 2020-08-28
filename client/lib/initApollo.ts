import Router from 'next/router'
import cookie from 'cookie'
import jwtDecode from 'jwt-decode'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { isBrowser } from './isBrowser'
import { getAccessToken, setAccessToken } from './token'
import { isServer } from './withApollo'
import { cacheConfig } from './cacheConfig'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create(
    initialState: NormalizedCacheObject,
    ctx?: any,
    serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {
  const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
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
      const cookies = cookie.parse(ctx.req.headers.cookie)
      let fetchProps: any = {}
      if (isServer() && cookies.jid) {
        fetchProps['headers']['cookie'] = 'jid=' + cookies.jid
      }
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include',
        ...fetchProps
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
        authorization: token ? `Bearer ${ token }` : ''
      }
    }
  })


  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) => {
        console.log(
            `[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`)
        if (isBrowser && message.includes('AuthenticationError')) {
          Router.push('/accounts/login', '/')
        }
      })

    if (networkError) console.log(`[Network error]: ${ networkError }`)
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: Boolean(ctx), // Disables forceFetch on the server (so queries are only run once)
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    link: ApolloLink.from([authLink, refreshLink, errorLink, httpLink as any]),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {})
  })
}

export default function initApollo(initialState: NormalizedCacheObject, ctx: any, serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return create(initialState, ctx, serverAccessToken)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx)
  }

  return apolloClient
}
