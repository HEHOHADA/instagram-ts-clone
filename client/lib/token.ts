import { isServer } from './withApollo'

let accessToken = ''

export const setAccessToken = (s: string) => {
  if (typeof window !== 'undefined')  {
    localStorage.setItem('token', s)
  }
  accessToken = s
}

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return accessToken
}
