import jwtDecode from 'jwt-decode'

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
    const {exp} = jwtDecode(token) as any
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}
