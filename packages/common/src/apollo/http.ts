import { ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { API_CONSTANTS } from '../config'
import { checkToken } from './util'

export function httpLinkWithUpload(api = API_CONSTANTS.api): ApolloLink {
  return createUploadLink({
    uri: api,
    credentials: 'include'
  })
}


export function wsLink(token: string, api = API_CONSTANTS.ws): ApolloLink {
  return new WebSocketLink(new SubscriptionClient(api, {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      authorization: token
    })
  }))
}

export function refreshLink(getAccessToken: () => Promise<string | null> | string | null, setAccessToken: (token: string) => Promise<void> | void, api = API_CONSTANTS.refresh): ApolloLink {
  return new TokenRefreshLink({
    isTokenValidOrUndefined:async () => {
      let possibleToken = getAccessToken()
      if (typeof possibleToken === 'object') {
        return checkToken(await possibleToken)
      } else {
        return checkToken(possibleToken)
      }
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
      console.log('fetch', result)
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
