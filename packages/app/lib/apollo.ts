import { onError } from '@apollo/client/link/error'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { authContextLink, cacheConfig, httpLinkWithUpload, refreshLink } from '@instagram/common'
import { getToken, setToken } from './token'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${ message }, Location: ${ locations || 'not found' }, Path: ${ path }`)
    })

  if (networkError) console.log(`[Network error]: ${ JSON.stringify(networkError) }`)
})

export default new ApolloClient({
  link: ApolloLink.from([refreshLink(getToken,
    setToken), authContextLink(getToken),
    errorLink, httpLinkWithUpload]),

  cache: new InMemoryCache(cacheConfig)
})
