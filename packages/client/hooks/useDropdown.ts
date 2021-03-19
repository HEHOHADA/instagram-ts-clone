import { useCallback, useEffect, useRef, useState } from 'react'

export default function useDropdown(toggleClick?: () => void) {
  const dropDownRef = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(() => false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const closeOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropDownRef?.current &&
        !(dropDownRef.current! as HTMLDivElement).contains(e.target as HTMLDivElement)
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
