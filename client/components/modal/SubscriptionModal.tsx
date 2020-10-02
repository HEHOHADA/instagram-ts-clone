import React, { FC } from 'react'
import { ModalRefType } from '../../hoc/ModalWindowContainer'
import { CloseModalButton } from './CloseModalButton'
import { useGetFollowersQuery, useGetFollowingsQuery } from '../../geterated/apollo'

type SubscriptionModalType = {
  FollowButton: (isFollowing: boolean, id: string, userId?: string) => JSX.Element
  id: string
  subscriber: boolean,
  userId?: string
}

export const SubscriptionModal: FC<ModalRefType & SubscriptionModalType> = ({closeModal, id, subscriber, userId, FollowButton}) => {
  let data = null
  if (subscriber) {
    data = useGetFollowersQuery({variables: {userId: id}}).data?.getFollowers
  } else {
    data = useGetFollowingsQuery({variables: {userId: id}}).data?.getFollowings
  }
  return (
      <>
        <div className="modal-window__subscription__header">
          <h1 className="modal-window__header__text">Подписчики</h1>
          <CloseModalButton closeModal={ closeModal }/>
        </div>

        <div className="modal-window__subscription__container">
          <ul className="subscription__items">
            { data && data.map(f => (
                <li className="subscription__item" key={ f.id }>
                  <div className="subscription__item__container">
                    <div className="subscription__user__info">
                      <div className="subscription__user__img">
                        { f.pictureUrl && <img
                            src={ f.pictureUrl }
                            alt="Фото"/> }
                      </div>
                      <div className="subscription__username__container">
                        <a className="subscription__username">{ f.username }</a>
                        <div className="subscription__full__name">{ f.fullName }</div>
                      </div>
                    </div>
                    <div className="subscription__info__btn__container">
                      { FollowButton(f.isFollowing, f.id, userId) }
                    </div>
                  </div>
                </li>
            )) }
          </ul>
        </div>

      </>
  )
}
