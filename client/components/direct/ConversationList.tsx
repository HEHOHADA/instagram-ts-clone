import React, { FC, useCallback, useRef } from 'react'
import { CreateDialog } from '../utils/svg/CreateDialog'
import { ChatsQuery } from '../../geterated/apollo'
import { DialogItem } from './chat/DialogItem'
import { ModalRefType, ModalWindowContainer } from '../../hoc/ModalWindowContainer'
import { SubscriptionModal } from '../modal/SubscriptionModal'

type ChatsType = ChatsQuery['chats']

type PropsType = {
  chats: ChatsType | undefined
}

export const ConversationList: FC<PropsType> = ({chats}) => {
  const modalRef = useRef<ModalRefType>(null)
  const openModal = useCallback(() => {
    modalRef.current?.openModal()
  }, [modalRef])
  return (
      <>
        <ModalWindowContainer ref={ modalRef }>
          { (ref: ModalRefType) => {
            return <SubscriptionModal { ...ref }/>
          }
          } }
        </ModalWindowContainer>
        <div className="direct__conversations__container">
          <div className="direct__conversations__header">
            <div className="header__text">Direct</div>
            <div className="header__add-new" onClick={ openModal }>
              <CreateDialog/>
            </div>
          </div>
          <div className="direct__conversation__overflow">
            { chats && <ul className="direct__conversations">
              { chats.map((c) => (
                  <DialogItem
                      id={ c.id }
                      username={ c.users[0].username }
                      date={ c.lastMessage?.date }
                      pictureUrl={ c.users[0].pictureUrl }
                      key={ c.id }/>
              )) }
            </ul>
            }
          </div>
        </div>
      </>
  )
}
