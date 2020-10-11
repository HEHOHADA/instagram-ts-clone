import React from 'react'

import { CloseModalButton } from './CloseModalButton'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { ChatDocument, useFindOrCreateChatMutation, useGetFollowingsQuery } from '@/geterated/apollo'
import Loading from '@/components/utils/Loading'
import { useHistory } from 'react-router'

export const CreateMessageModal = ({closeModal, id}: ModalRefType & { id: string }) => {
  const {data} = useGetFollowingsQuery({variables: {userId: id}})
  const [findOrCreateMutation] = useFindOrCreateChatMutation()
  const router = useHistory()
  const findOrCreateChat = async (userId: string) => {
    const response = await findOrCreateMutation({
      variables: {userId},
      update: (cache, {data}) => {
        if (data) {
          const {id, ...chatData} = data.findOrCreateChat
          cache.writeQuery({
            query: ChatDocument,
            variables: {id: data.findOrCreateChat.id},
            data: chatData
          })
        }
      }
    })
    if (response.data) {
      closeModal()
      router.replace(`/direct/t/${ response.data.findOrCreateChat.id }`)
    }
  }

  return (
      <>
        <div className="modal-window__subscription__header">
          <CloseModalButton closeModal={ closeModal }/>
          <h1 className="modal-window__header__text">Новое сообщение</h1>
          <button className="comment__btn">Далее</button>
        </div>
        <div className="modal-window__subscription__header">
          <div className="comment__username">Кому</div>
          <input className="comment__add" type="text"/>
        </div>
        <div className="modal-window__subscription__container">
          <ul className="subscription__items">
            { data ? data.getFollowings.map(item => (
                    <li className="subscription__item" key={ item.id }>
                      <div className="subscription__item__container" onClick={ () => findOrCreateChat(item.id) }>
                        <div className="subscription__user__info">
                          <div className="subscription__user__img">
                            { item.pictureUrl && <img
                                src={ item.pictureUrl }
                                alt="Фото"/> }
                          </div>
                          <div className="subscription__username__container">
                            <a className="subscription__username">{ item.username }</a>
                          </div>
                        </div>
                        <div className="subscription__info__btn__container">
                          <input type="checkbox" className="subscription__info__btn"/>
                        </div>
                      </div>
                    </li>
                )
            ) : <Loading/> }
          </ul>
        </div>
      </>
  )
}
