import { useEffect, EffectCallback } from 'react'

export const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, [])
}
