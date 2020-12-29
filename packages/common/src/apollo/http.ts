import jwtDecode from 'jwt-decode'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { API_CONSTANTS } from '../config'
import { TokenType } from '../types'

export const httpLinkWithUpload = createUploadLink({
  uri: API_CONSTANTS.api,
  credentials: 'include'
})

export const wsLink = (token: string) => new WebSocketLink(new SubscriptionClient(API_CONSTANTS.ws, {
  reconnect: true,
  lazy: true,
  connectionParams: () => ({
    authorization: token
  })
}))

export const refreshLink = (getAccessToken: () => Promise<string | null> | string | null, setAccessToken: (token: string) => Promise<void> | void,) => new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    // while (typeof token !== 'string' || token) {
    // }
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
    return fetch(API_CONSTANTS.refresh, {
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


export const authContextLink = (getAccessToken: () => Promise<string | null> | string | null) => setContext(async (_req, {headers}) => {
  const token = await getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${ token }` : ''
    }
  }
})
