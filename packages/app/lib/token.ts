import * as SecureStore from 'expo-secure-store'

const token = 'token'

export async function getItem(key: string): Promise<string | null> {
  const value = await SecureStore.getItemAsync(key)
  return value ? value : null
}

export async function setItem(key: string, value: string): Promise<void> {
  return SecureStore.setItemAsync(key, value)
}

export async function removeItem(key: string): Promise<void> {
  return SecureStore.deleteItemAsync(key)
}

export const getToken = () => getItem(token)
export const removeToken = () => removeItem(token)
export const setToken = (value: string) => setItem(token, value)
