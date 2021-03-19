const isLocalStorageSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window['localStorage'] !== 'undefined' &&
    window['localStorage'] !== null
  )
}

export const readFromLocalStorage = (key: string) => {
  if (!isLocalStorageSupported()) {
    return { success: false, error: new Error('No localStorage') }
  }
  try {
    const storedValue = localStorage.getItem(key)
    if (storedValue === null) {
      return { success: false, error: new Error('No value with given key') }
    }
    const value = JSON.parse(storedValue)
    return { success: true, value }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to get item from localStorage with "${key}" key`, e)
    }
    return { success: false, error: e }
  }
}

export const saveToLocalStorage = (key: string, value: any) => {
  if (!isLocalStorageSupported()) {
    return { success: false, error: new Error('No localStorage') }
  }
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return { success: true, value }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to save item to localStorage with "${key}" key`, e)
    }
    return { success: false, error: e }
  }
}

export const locStorage = {
  read: readFromLocalStorage,
  save: saveToLocalStorage
}
