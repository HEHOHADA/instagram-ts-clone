import React, { FC } from 'react'
import { CloseSvg } from '../utils/svg/CloseSvg'

type PropsType = {
  closeModal: () => void
}

export const CloseModalButton: FC<PropsType> = React.memo(({closeModal}) => {
  return (
      <div className="modal-window__header__close">
        <button className="header__close" onClick={ closeModal }>
          <CloseSvg/>
        </button>
      </div>
  )
})
