import Router from 'next/router'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { isBrowser } from './isBrowser'
import { getAccessToken } from './token'
import { isServer } from './withApollo'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

function create(initialState: any, serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  })

  // const uploadLink = createUploadLink({
  //   uri: 'http://localhost:4000/graphql',
  //   credentials: 'include'
  // })
  // const refreshLink = new TokenRefreshLink({
  //   isTokenValidOrUndefined: () => {
  //     const token = getAccessToken()
  //
  //     if (!token) {
  //       return false
  //     }
  //
  //     try {
  //       const {exp} = jwtDecode(token)
  //       return Date.now() >= exp * 1000
  //     } catch {
  //       return false
  //     }
  //   },
  //   accessTokenField: 'accessToken',
  //   fetchAccessToken: () => {
  //     // const link = createHttpLink({
  //     //   uri: 'http://localhost:4000/refresh_token',
  //     //   credentials: 'include'
  //     // })
  //     // //
  //     // ApolloLink.execute(link,{query:RefreshTokenDocument}).subscribe(observer=>{
  //     //   console.log(observer)
  //     // })
  //     // return fetch('http://localhost:4000/refresh_token', {
  //     //   method: 'POST',
  //     //   credentials: 'include'
  //     // })
  //     // const instance = axios.create({withCredentials: true})
  //     // return instance.post('http://localhost:4000/refresh_token')
  //     // console.log(await response.json())
  //     //
  //     // return new Promise(()=>true)
  //   },
  //   handleResponse: (_, accessTokenField) => async (response: any) => {
  //     // console.log(operation)
  //     // here you can parse response, handle errors, prepare returned token to
  //     // further operations
  //     console.log(await response)
  //     const result = await response.json()
  //     return {
  //       [accessTokenField]: result[accessTokenField]
  //     }
  //     // returned object should be like this:
  //     // {
  //     //    access_token: 'token string here'
  //     // }
  //   },
  //   handleFetch: accessTokenPayload => {
  //     console.log(accessTokenPayload)
  //     setAccessToken(accessTokenPayload)
  //   },
  //   handleError: err => {
  //     console.error(err)
  //   }
  // }) as ApolloLink


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
          Router.push('/accounts/login')
        }
      })

    if (networkError) console.log(`[Network error]: ${ networkError }`)
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    link: ApolloLink.from([authLink,
      errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState: any, serverAccessToken?: string): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return create(initialState, serverAccessToken)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
