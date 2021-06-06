import React, { FC } from 'react'
import { CloseModalButton } from './CloseModalButton'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { useGetFollowersQuery, useGetFollowingsQuery } from '@/geterated'
import { UserLink } from '@/components/link'
import { FollowButton, FollowButtonReturn } from '@/components/follow/FollowButton'
import Loading from '@/components/utils/Loading'

type SubscriptionModalType = {
  id: string
  isCurrent: boolean
  subscriber: boolean
  userId?: string
}

export const SubscriptionModal: FC<ModalRefType & SubscriptionModalType> = ({
  closeModal,
  id,
  subscriber,
  userId,
}) => {
  let data = null
  if (subscriber) {
    data = useGetFollowersQuery({ variables: { userId: id } }).data?.getFollowers
  } else {
    data = useGetFollowingsQuery({ variables: { userId: id } }).data?.getFollowings
  }
  return (
    <>
      <div className='modal-window__subscription__header'>
        <h1 className='modal-window__header__text'>{ subscriber ? 'Подписчики' : 'Подписки' }</h1>
        <CloseModalButton closeModal={ closeModal } />
      </div>

      <div className='modal-window__subscription__container'>
        <ul className='subscription__items'>
          { data ? data.map(user => (
            <li className='subscription__item' key={ user.id }>
              <div className='subscription__item__container'>
                <div className='subscription__user__info'>
                  <div className='subscription__user__img'>
                    { user.pictureUrl && <img
                      src={ user.pictureUrl }
                      alt='Фото' /> }
                  </div>
                  <div className='subscription__username__container'>
                    <UserLink username={ user.username }>
                      <a
                        className='subscription__username'>{ user.username }</a>
                    </UserLink>
                    <div className='subscription__full__name'>{ user.fullName }</div>
                  </div>
                </div>
                <div className='subscription__info__btn__container'>
                  <FollowButton isFollowing={ user.isFollowing } id={ user.id } userId={ userId } />
                </div>
              </div>
            </li>
          )) : <Loading /> }
        </ul>
      </div>
    </>
  )
}
