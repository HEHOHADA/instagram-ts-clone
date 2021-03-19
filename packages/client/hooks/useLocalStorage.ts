import { useState, useCallback } from 'react'
import { locStorage } from '@/lib/localStorage'

export const useLocalStorage = <V>(key: string, initialValue: V, passive: boolean) => {
  const [storedValue, setStoredValue] = useState<V | undefined>(() => {
    if (passive) {
      return
    }
    const { success, value } = locStorage.read(key)
    return success ? value : initialValue
  })

  const readStoredValue = useCallback(() => {
    const { success, value } = locStorage.read(key)
    if (success) {
      setStoredValue(value)
      return value
    }
  }, [key])

  const storeNewValue = useCallback(
    (value: V | ((storedValue?: V) => V)) => {
      // allow value to be a function to optionally provide API similar to setSate
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      locStorage.save(key, valueToStore)
    },
    [key, storedValue]
  )

  return [storedValue, storeNewValue, readStoredValue] as [
    typeof storedValue,
    typeof storeNewValue,
    typeof readStoredValue
  ]
}
