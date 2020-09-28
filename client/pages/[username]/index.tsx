import React, { useMemo, useState } from 'react'
import MainLayout from '../../components/MainLayout'

import { declOfNum } from '../../utils/declOfNumb'
import { PhotoItems } from '../../components/profile/PhotoItems'
import { ModalRefType } from '../../hoc/ModalWindowContainer'
import { SubscriptionModal } from '../../components/modal/SubscriptionModal'
import { FollowButton } from '../../components/profile/FollowButton'
import { ProfileItems } from '../../components/profile/ProfileItems'
import { useRouter } from 'next/router'
import withApollo from '../../lib/withApollo'
import { followCallback } from '../../utils/followFunction'
import {
  GetUserInfoQuery,
  PhotoItemFragment,
  useFollowUserMutation,
  useGetUserInfoQuery,
  useUnFollowUserMutation,
  useViewUserPhotoQuery
} from '../../geterated/apollo'
import { useModal } from '../../hooks/useModal'


export type ProfileItemsType = {
  onClick?: () => void | null | undefined
  count: number
  text: string
}

type ModalUserPageType = 'subscribers' | 'subscriptions' | null
type GetUserInfoQueryType = GetUserInfoQuery['getUserInfo']

const Profile = () => {
  const {openModal, ModalWindow} = useModal()
  const [currentModalName, serCurrentModalName] = useState<ModalUserPageType>(() => null)
  const router = useRouter()
  const {username: queryUserName} = router.query
  const {data} = useGetUserInfoQuery({variables: {username: (queryUserName as string)}})
  const {data: dataPhoto} = useViewUserPhotoQuery({variables: {username: (queryUserName as string)}})

  if (!data) {
    return <MainLayout title={ 'Ошибка' }>
      <h1 style={ {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '40px'
      } }>Такого пользователя нет</h1>
    </MainLayout>
  } else {
  }

  const {
    photoCount, followerCount,
    isCurrentUser, id,
    isFollowing, username, followingCount, pictureUrl, fullName
  }: GetUserInfoQueryType = data.getUserInfo

  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()

  const followButton = useMemo(() => {
    const onClick = isFollowing
        ? followCallback(unFollowUser, -1)
        : followCallback(followUser, 1)
    const text = isFollowing ? 'Отписаться' : 'Подписаться'
    return (
        <FollowButton
            text={ text }
            className={ 'profile__edit' }
            onClick={ () => onClick(id) }/>
    )
  }, [isFollowing, id])


  const infoItems = useMemo<Array<ProfileItemsType>>(() => {
    return [
      {
        count: (photoCount as number),
        text: declOfNum((photoCount as number), ['Публикация', 'Публикации', 'Публикаций'])
      },
      {
        count: (followerCount as number),
        onClick: () => {
          serCurrentModalName('subscribers')
          openModal()
        },
        text: declOfNum((followerCount as number), ['Подписка', 'Подписок', 'Подписки'])
      },
      {
        count: (followingCount as number),
        onClick: () => {
          serCurrentModalName('subscriptions')
          openModal()
        },
        text: declOfNum((followingCount as number), ['Подписчик', 'Подписчиков', 'Подписчика'])
      },
    ]
  }, [photoCount, followerCount, followingCount])


  return (
      <MainLayout title={ fullName }>
        <ModalWindow>
          { (ref: ModalRefType) => {
            switch (currentModalName) {
              case'subscribers':
                return (<SubscriptionModal id={ id } { ...ref }/>)
              case 'subscriptions':
                return <SubscriptionModal id={ id } { ...ref }/>
              default:
                return null
            }
          } }
        </ModalWindow>
        <div className="profile container">
          <div className="profile__info">
            <div className="profile__image">
              <div className="profile__image__center">
                { pictureUrl && <img
                    className="profile__img"
                    src={ pictureUrl }
                    alt=""/> }
              </div>
            </div>
            <ProfileItems
                username={ username }
                isCurrentUser={ isCurrentUser }
                followButton={ followButton }
                infoItems={ infoItems }
                fullName={ fullName }/>
          </div>
          <hr/>
          <div className="profile__objects">
            <div className="profile__objects__lin">
              <div className="object__item active">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
            </div>
          </div>
          { dataPhoto?.viewUserPhoto && <PhotoItems photoItems={ dataPhoto.viewUserPhoto as PhotoItemFragment[] }/> }
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(Profile)
