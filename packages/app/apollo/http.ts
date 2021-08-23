import { ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createUploadLink } from 'apollo-upload-client'
import { apiConstants } from 'constants/default'
import { checkToken } from './util'

export function httpLinkWithUpload(api = apiConstants.api){
  return createUploadLink({
    uri: api,
    credentials: 'include'
  })
}

export function wsLink(getAccessToken: () => Promise<string | null> | string | null, api = apiConstants.ws): ApolloLink {
  return new WebSocketLink(new SubscriptionClient(api, {
    reconnect: true,
    lazy: true,
    connectionParams: async () => {
      const token = await getAccessToken()
      return {
        authorization: token ? `Bearer ${ token }` : ''
      }
    }
  }))
}

export function refreshLink(getAccessToken: () => Promise<string | null> | string | null, setAccessToken: (token: string) => Promise<void> | void, api = apiConstants.refresh): ApolloLink {
  // @ts-ignore
  return new TokenRefreshLink({
    // @ts-ignore
    isTokenValidOrUndefined: async () => {
      let possibleToken = getAccessToken()
      return checkToken(typeof possibleToken === 'object' ? await possibleToken : possibleToken)
    },
    accessTokenField: 'accessToken',
    fetchAccessToken: () => {
      return fetch(api, {
        method: 'POST',
        credentials: 'include'
      })
    },
    handleResponse: (_, accessTokenField) => async (response: Response) => {
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
}


export function authContextLink(getAccessToken: () => Promise<string | null> | string | null): ApolloLink {
  return setContext(async (_req, {headers}) => {
    const token = await getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${ token }` : ''
      }
    }
  })
}
