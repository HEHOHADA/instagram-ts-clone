import { createWithApollo } from './createWithApollo'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'
import { createUploadLink } from 'apollo-upload-client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { getAccessToken, setAccessToken } from '../token'
import jwtDecode from 'jwt-decode'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { isBrowser } from '../isBrowser'
import Router from 'next/router'

const createClient = (ctx: NextPageContext) => {

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
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          cookie:
              (typeof window === 'undefined' ? ctx.req?.headers.cookie : undefined) ||
              '',
        },
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
        if (isBrowser && message.includes('AuthenticationError')) {
          Router.push('/accounts/login', '/')
        }
      })

    if (networkError) console.log(`[Network error]: ${ networkError }`)
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    link: ApolloLink.from([authLink, refreshLink, errorLink, httpLink as any]),
    cache: new InMemoryCache()
  })
}

export const withApollo = createWithApollo(createClient)
