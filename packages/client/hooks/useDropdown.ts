import { useCallback, useRef, useState } from 'react'
import { useEffectOnce } from '.'

export function useDropdown<T extends HTMLElement>(toggleClick?: () => void) {
  const dropDownRef = useRef<T | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(() => false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const closeOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropDownRef?.current &&
        !(dropDownRef.current as HTMLElement).contains(e.target as HTMLDivElement)
      ) {
        toggleClick ? toggleClick() : close()
      }
    },
    [toggleClick, close]
  )

  useEffectOnce(() => {
    document.addEventListener('click', closeOutside)
    return () => {
      close()
      document.removeEventListener('click', closeOutside)
    }
  })

  return {
    dropDownRef,
    isOpen,
    toggleClick,
    close,
    open,
    closeOutside
  }
}
