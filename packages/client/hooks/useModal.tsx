import React, { FC, useCallback, useRef } from 'react'
import { Getters } from '@/hoc'
import ModalWindowContainer, { ModalRefType } from '@/hoc/ModalWindowContainer'

export type ModalGetters = Getters<ReturnType<typeof useModal>>

export const useModal = () => {
  const modalRef = useRef<ModalRefType>(null)

  const openModal = useCallback(() => {
    modalRef.current?.openModal()
  }, [modalRef])

  const closeModal = useCallback(() => {
    modalRef.current?.closeModal()
  }, [modalRef])

  const ModalWindow: FC<{ children: FC<ModalRefType> }> = ({ children }) => {
    return (
      <ModalWindowContainer ref={ modalRef }>
        { (ref: ModalRefType) => children(ref) }
      </ModalWindowContainer>
    )
  }

  return { modalRef, openModal, closeModal, ModalWindow }
}
