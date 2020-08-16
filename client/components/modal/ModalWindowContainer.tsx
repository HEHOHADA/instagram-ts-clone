import React, { PropsWithChildren, useImperativeHandle, useRef, useState } from 'react'


export type ModalRefType = {
  openModal: () => void
  closeModal: () => void
  closeOutside: (e: MouseEvent) => void
}

export const ModalWindowContainer = React.forwardRef<ModalRefType,
    PropsWithChildren<{}>>((props, ref) => {
  const [showSubsModal, setShowSubsModal] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  const closeOutside = (e: MouseEvent) => {
    if (!((modalRef.current as HTMLDivElement).contains(e.target as HTMLDivElement))) {
      close()
    }
  }

  const open = () => {
    setShowSubsModal(true)
  }

  const close = () => {
    setShowSubsModal(false)
  }

  useImperativeHandle(ref, () => ({
    openModal: open,
    closeModal: close,
    closeOutside: closeOutside
  }), [])

  if (showSubsModal) {
    return (
        <div className="modal-window__background"
             id="modal-window-container">
          <div ref={ modalRef }
               className="modal-window__container">
            <div className="modal-window">
              { props.children }
            </div>
          </div>
        </div>)
  }
  return null
})
