import React, { FC } from 'react'
import Link from 'next/link'

import Loading from '@/components/utils/Loading'
import { CloseModalButton } from './CloseModalButton'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { useGetFollowersQuery, useGetFollowingsQuery } from '@/geterated/apollo'

type SubscriptionModalType = {
  FollowButton: (isFollowing: boolean, id: string, userId?: string) => JSX.Element
  id: string
  isCurrent:boolean
  subscriber: boolean
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
          <h1 className="modal-window__header__text">{ subscriber ? 'Подписчики' : 'Подписки' }</h1>
          <CloseModalButton closeModal={ closeModal }/>
        </div>

        <div className="modal-window__subscription__container">
          <ul className="subscription__items">
            { data ? data.map(user => (
                <li className="subscription__item" key={ user.id }>
                  <div className="subscription__item__container">
                    <div className="subscription__user__info">
                      <div className="subscription__user__img">
                        { user.pictureUrl && <img
                            src={ user.pictureUrl }
                            alt="Фото"/> }
                      </div>
                      <div className="subscription__username__container">
                        <Link
                            href={ '/[username]' }
                            as={ `/${ user.username }` }
                            passHref
                        >
                          <a className="subscription__username">{ user.username }</a>
                        </Link>
                        <div className="subscription__full__name">{ user.fullName }</div>
                      </div>
                    </div>
                    <div className="subscription__info__btn__container">
                      { FollowButton(user.isFollowing, user.id, userId) }
                    </div>
                  </div>
                </li>
            )) : <Loading/> }
          </ul>
        </div>
      </>
  )
}
