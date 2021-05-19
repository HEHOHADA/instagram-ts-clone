import React, { FC, ForwardRefRenderFunction, MutableRefObject, useImperativeHandle } from 'react'
import useDropdown from '@/hooks/useDropdown'

export type ModalRefType = {
  openModal: () => void
  closeModal: () => void
}

type PropsWithChildrenModalType = { children: FC<ModalRefType> }

const ModalWindowContainer: ForwardRefRenderFunction<ModalRefType,
  PropsWithChildrenModalType> = (props, ref) => {
  const { isOpen, close, open, dropDownRef: modalRef } = useDropdown()

  useImperativeHandle(ref, () => ({
    openModal: open,
    closeModal: close
  }), [close, open])

  if (isOpen && ref) {
    const children = props.children as FC<ModalRefType>
    const refItem = ref as MutableRefObject<ModalRefType>

    return (
      <div className='modal-window__background modal-animate'
           id='modal-window-container'>
        <div ref={ modalRef }
             className='modal-window__container'>
          <div className='modal-window'>
            { children(refItem.current) }
          </div>
        </div>
      </div>)
  }

  return null
}

export default React.forwardRef(ModalWindowContainer)
