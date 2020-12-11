import React, { FC } from 'react'

import { useModal } from '@/hooks/useModal'
import { DialogItem } from './chat/DialogItem'
import { CreateDialog } from '../utils/svg/CreateDialog'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { CreateMessageModal } from '../modal/CreateMessageModal'
import Loading from '@/components/utils/Loading'
import { ChatsQuery, useMeQuery } from '@instagram/common'

type ChatsType = ChatsQuery['chats']

type PropsType = {
  loading: boolean
  chats: ChatsType | null | undefined
}

export const ConversationList: FC<PropsType> = ({chats, loading}) => {
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
          <div className="header__add-new" onClick={ (e) => {
            e.stopPropagation()
            openModal()
          } }>
            <CreateDialog/>
          </div>
        </div>
        <div className="direct__conversation__overflow">
          { loading ? <Loading/> : chats?.length ? <ul className="direct__conversations">
            { chats.map((c) => (
              <DialogItem
                id={ c.id }
                username={ c.users[0].username }
                date={ c.lastMessage?.date }
                pictureUrl={ c.users[0].pictureUrl }
                key={ c.id }/>
            )) }
          </ul> : <h1 style={ {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '32px'
          } }>Нет чатов</h1>
          }
        </div>
      </div>
    </>
  )
}
