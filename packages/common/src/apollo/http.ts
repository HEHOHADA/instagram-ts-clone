import jwtDecode from 'jwt-decode'
import { ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { TokenType } from '../types'
import { API_CONSTANTS } from '../config'

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
    isTokenValidOrUndefined: () => {
      let possibleToken = getAccessToken()
      let token
      if (typeof possibleToken === 'object') {
        (async () => {
          try {
            token = await possibleToken
          } catch (err) {
            console.log(err)
          }
        })()
      } else {
        token = possibleToken
      }

      if (!token) {
        return true
      }

      try {
        const {exp} = jwtDecode(token as any) as TokenType
        return Date.now() < exp * 1000
      } catch {
        return false
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
  }) as any
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
