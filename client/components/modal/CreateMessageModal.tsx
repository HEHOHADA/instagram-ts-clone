import React from 'react'
import { CloseModalButton } from './CloseModalButton'
import { ModalRefType } from '../../hoc/ModalWindowContainer'
import { useGetFollowersQuery } from '../../geterated/apollo'

export const CreateMessageModal = ({closeModal,id}: ModalRefType & { id: string }) => {
  const {data} = useGetFollowersQuery({variables: {userId:id}})
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
            { data?.getFollowers.map(item => {
              return (
                  <li className="subscription__item" key={ item.id }>
                    <div className="subscription__item__container">
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
            }) }
          </ul>
        </div>

      </>
  )
}
