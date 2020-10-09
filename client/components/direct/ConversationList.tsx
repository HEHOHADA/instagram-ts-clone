import React, { FC } from 'react'

import { useModal } from '@/hooks/useModal'
import { DialogItem } from './chat/DialogItem'
import { CreateDialog } from '../utils/svg/CreateDialog'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { ChatsQuery, useMeQuery } from '@/geterated/apollo'
import { CreateMessageModal } from '../modal/CreateMessageModal'

type ChatsType = ChatsQuery['chats']

type PropsType = {
  chats: ChatsType | undefined
}

export const ConversationList: FC<PropsType> = ({chats}) => {
  const {ModalWindow, openModal} = useModal()
  const {data} = useMeQuery()
  return (
      <>
        <ModalWindow>
          { (ref: ModalRefType) => {
            return <CreateMessageModal id={ data!.me!.id } { ...ref }/>
          } }
        </ModalWindow>
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
