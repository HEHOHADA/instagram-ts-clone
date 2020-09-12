import { isServer } from './withApollo'

let accessToken = ''

export const setAccessToken = (s: string) => {
  if (!isServer()) {
    localStorage.setItem('token', s)
  }
  accessToken = s
}

export const getAccessToken = () => {
  if (!isServer()) {
    return accessToken || localStorage.getItem('token')
  }
  return accessToken
}
