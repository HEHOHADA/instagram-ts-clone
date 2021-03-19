import { useRef } from 'react'

export const useRenderCountRef = () => {
  const counter = useRef(0)
  counter.current++
  return counter
}

export const useRenderCount = () => useRenderCountRef().current
