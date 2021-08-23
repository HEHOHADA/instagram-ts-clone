import { Platform } from 'react-native'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, ApolloLink, InMemoryCache, OperationVariables, split } from '@apollo/client'
import { authContextLink, cacheConfig, httpLinkWithUpload, refreshLink, wsLink } from '../apollo'
import { getToken, setToken } from './token'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${ message }, Location: ${ locations || 'not found' }, Path: ${ path }`)
    })

  if (networkError) console.log(`[Network error]: ${ JSON.stringify(networkError) }`)
})

const host =
  Platform.OS === 'ios' ? 'http://localhost:4000/graphql' : 'http://192.168.1.227:4000/graphql'
const httpLink = httpLinkWithUpload(host) as any
const link =
  split(
    ({query}: any) => {
      const {kind, operation}: OperationVariables = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink(getToken,'ws://192.168.1.145:4000/subscription'),
    httpLink
  )
export default new ApolloClient({
  link: ApolloLink.from([refreshLink(getToken,
    setToken, 'http://192.168.1.145:4000/refresh_token'), authContextLink(getToken),
    errorLink, link]),
  cache: new InMemoryCache(cacheConfig)
})
