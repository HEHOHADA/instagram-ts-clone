import React from 'react'
import { ModalRefType } from './ModalWindowContainer'

type PropsType = {
  deletePhoto: () => void
  isAuthor: boolean
}

export const PhotoSettingsModal = ({closeModal, isAuthor, deletePhoto}: ModalRefType & PropsType) => {

  return (
      <>
        { isAuthor && <button onClick={ deletePhoto }
                              className="photo__settings__modal">Удалить
        </button> }
        <button className="photo__settings__modal">Удалить</button>
        <button className="photo__settings__modal">Удалить</button>
        <button className="photo__settings__modal">Удалить</button>
        <button className="photo__settings__modal">Удалить</button>
        <button onClick={ closeModal } className="photo__settings__modal">Отменить</button>
      </>
  )
}
