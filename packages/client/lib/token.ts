import { isServer } from './withApollo'

let accessToken = ''
const localStorageTokenName = 'token'
export const setAccessToken = (s: string) => {
  if (!isServer()) {
    if (s) {
      localStorage.setItem(localStorageTokenName, s)
    } else {
      localStorage.removeItem(localStorageTokenName)
    }
  }
  accessToken = s
}

export const getAccessToken = () => {
  return !isServer() ? accessToken || localStorage.getItem(localStorageTokenName) : accessToken
}
