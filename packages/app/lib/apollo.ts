import { onError } from '@apollo/client/link/error'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { getToken, setToken } from './token'
import { Platform } from 'react-native'
import { authContextLink, cacheConfig, httpLinkWithUpload, refreshLink } from '@instagram/common'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${ message }, Location: ${ locations || 'not found' }, Path: ${ path }`)
    })

  if (networkError) console.log(`[Network error]: ${ JSON.stringify(networkError) }`)
})

const host =
  Platform.OS === 'ios' ? 'http://localhost:4000/graphql' : 'http://192.168.1.145:4000/graphql'
const httpLink = httpLinkWithUpload(host)

export default new ApolloClient({
  link: ApolloLink.from([refreshLink(getToken,
    setToken, 'http://192.168.1.145:4000/refresh_token'), authContextLink(getToken),
    errorLink,httpLink]),
  cache: new InMemoryCache(cacheConfig)
})
