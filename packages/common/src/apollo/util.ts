let accessToken = ''
export const setServerAccessToken = (s: string) => {
  accessToken = s
}

export const getServerAccessToken = () => {
  return accessToken
}
