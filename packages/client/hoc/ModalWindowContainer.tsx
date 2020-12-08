import React, { FC, ForwardRefRenderFunction, useImperativeHandle } from 'react'
import useDropdown from '@/hooks/useDropdown'


export type ModalRefType = {
  openModal: () => void
  closeModal: () => void
}

type PropsWithChildrenModalType = { children: FC<ModalRefType> }

const ModalWindowContainer: ForwardRefRenderFunction<ModalRefType,
  PropsWithChildrenModalType> = (props, ref) => {
  // const [showSubsModal, setShowSubsModal] = useState(false)
  const {isOpen, close, open, dropDownRef: modalRef} = useDropdown()
  // const modalRef = useRef<HTMLDivElement>(null)

  // const closeOutside = (e: MouseEvent) => {
  //   if (!((modalRef.current as HTMLDivElement).contains(e.target as HTMLDivElement))) {
  //     close()
  //   }
  // }
  // useEffect(() => {
  //   document.getElementById('modal-window-container')?.addEventListener('click', closeOutside)
  //   return () => {
  //     if (showSubsModal) {
  //       close()
  //     }
  //     document.getElementById('modal-window-container')?.removeEventListener('click', closeOutside)
  //   }
  // }, [showSubsModal])
  // const open = () => setShowSubsModal(true)
  //
  // const close = () => setShowSubsModal(false)

  useImperativeHandle(ref, () => ({
    openModal: open,
    closeModal: close
  }), [])


  if (isOpen) {
    const children = props.children as FC<ModalRefType>

    return (
      <div className="modal-window__background modal-animate"
           id="modal-window-container">
        <div ref={ modalRef }
             className="modal-window__container">
          <div className="modal-window">
            {
              // @ts-ignore
              children(ref.current) }
          </div>
        </div>
      </div>)
  }
  return null
}


export default React.forwardRef(ModalWindowContainer)
