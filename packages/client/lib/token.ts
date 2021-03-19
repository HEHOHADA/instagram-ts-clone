import { readFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage'

let accessToken = ''

const localStorageTokenName = 'token'

export const setAccessToken = (s: string) => {
  saveToLocalStorage(localStorageTokenName, s)
  accessToken = s
}

export const getAccessToken = () => {
  return readFromLocalStorage(localStorageTokenName).value ?? accessToken
}
