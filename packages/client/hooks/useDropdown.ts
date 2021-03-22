import { useCallback, useEffect, useRef, useState } from 'react'

export default function useDropdown<T extends HTMLElement>(toggleClick?: () => void) {
  const dropDownRef = useRef<T>(null)
  const [isOpen, setIsOpen] = useState<boolean>(() => false)
  const open = useCallback(() => setIsOpen(true),[])
  const close = useCallback(() => setIsOpen(false),[])
  const closeOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropDownRef?.current &&
        !(dropDownRef.current! as HTMLElement).contains(e.target as HTMLDivElement)
      ) {
        toggleClick ? toggleClick() : close()
      }
    },
    [toggleClick, dropDownRef]
  )

  useEffect(() => {
    document.addEventListener('click', closeOutside)
    return () => {
      toggleClick ? toggleClick() : close()
      document.removeEventListener('click', closeOutside)
    }
  }, [])

  return {
    dropDownRef,
    isOpen,
    toggleClick,
    close,
    open,
    closeOutside
  }
}
