import jwtDecode from 'jwt-decode'

export type TokenType = {
  userId: string
  tokenVersion: string | number
  iat: number
  exp: number
}

let accessToken = ''
export const setServerAccessToken = (s: string) => {
  accessToken = s
}

export const getServerAccessToken = () => {
  return accessToken
}

export const checkToken = (token?: string | null): boolean => {
  if (!token) {
    return true
  }

  try {
    const {exp} = jwtDecode(token) as TokenType
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}
