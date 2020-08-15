import React, { useMemo, useState } from 'react'
import Link from 'next/link'

import MainLayout from '../../components/MainLayout'
import { MyContext } from '../../interfaces/MyContext'
import {
  Exact,
  GetUserInfoDocument,
  GetUserInfoQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  ViewUserPhotoDocument,
  ViewUserPhotoQuery
} from '../../geterated/apollo'
import redirect from '../../lib/redirect'
import ProfileInfoItems from '../../components/profile/ProfileInfoItems'
import { declOfNum } from '../../utils/declOfNumb'
import { PhotoItems } from '../../components/profile/PhotoItems'
import { ModalWindowContainer } from '../../components/modal/ModalWindowContainer'
import { SubscriptionModal } from '../../components/modal/SubscriptionModal'
import { FollowButton } from '../../components/profile/FollowButton'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'
import { IUserInfo } from '../../interfaces'

type PropsType = {
  getUserInfo: IUserInfo,
  viewUserPhoto: Array<{
    pictureUrl: string
    date: Date
    userId: string
    photoId: string
  }>
}

type FollowCallbackType<T> =
    (options?: (MutationFunctionOptions<T, Exact<{ userId: string }>> | undefined))
        => Promise<FetchResult<T>> | void

const Profile = ({getUserInfo, viewUserPhoto}: PropsType) => {
  const [showSubsModal, setShowSubsModal] = useState(false)
  const {
    photoCount,
    followerCount,
    isCurrentUser,
    id,
    isFollowing,
    username, followingCount,
    pictureUrl,
    fullName
  } = getUserInfo

  const [followerInfo, setFollowerInfo] =
      useState<{ isFollowing: boolean, followerCount: number }>({
        isFollowing,
        followerCount
      })
  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()


  function followCallback<T>(followCallback: FollowCallbackType<T>, count: number): (userId: string) => Promise<void> {
    return async (userId: string) => {
      await followCallback({
        variables: {userId},
        update: (cache) => {
          cache.identify({__ref: `User:${ userId }`})
          setFollowerInfo(prevState => {
            return {isFollowing: !prevState.isFollowing, followerCount: prevState.followerCount + count}
          })
          cache.modify({
            id: cache.identify({__ref: `User:${ userId }`}),
            fields: {
              isFollowing(cacheValue) {
                return !cacheValue
              },
              followerCount(cacheValue) {
                return cacheValue + count
              }
            }
          })
        }
      })
    }
  }

  const followButton = useMemo(() => {
    const onClick = followerInfo.isFollowing
        ? followCallback(unFollowUser, -1)
        : followCallback(followUser, 1)
    const text = followerInfo.isFollowing ? 'Отписаться' : 'Подписаться'
    return (
        <FollowButton
            text={ text }
            className={ 'profile__edit' }
            onClick={ () => onClick(id) }/>
    )
  }, [followerInfo.isFollowing, id])


  const infoItems = useMemo(() => {
    return [
      {count: photoCount, text: declOfNum(photoCount, ['Публикация', 'Публикации', 'Публикаций'])},
      {
        count: followerInfo.followerCount,
        onClick: () => setShowSubsModal(true),
        text: declOfNum(followerInfo.followerCount, ['Подписок', 'Подписка', 'Подписки'])
      },
      {count: followingCount, text: declOfNum(followingCount, ['Подписчик', 'Подписчиков', 'Подписчика'])},
    ]
  }, [photoCount, followerInfo.followerCount, followingCount])

  return (
      <MainLayout title={ username }>
        { showSubsModal &&
        <ModalWindowContainer>
          <SubscriptionModal onClick={ () => setShowSubsModal(false) }/>
        </ModalWindowContainer>
        }
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
            <div className="profile__items">
              <div className="profile__item__header">
                <h2 className="profile__name">{ username }</h2>
                { isCurrentUser ?
                    <Link href="/accounts/settings">
                      <a className="profile__edit">Редиактировать пользователя</a>
                    </Link> : followButton
                }
                <a className="profile__settings">
                            <span className="material-icons">
                                settings
                            </span>
                </a>
              </div>
              <ProfileInfoItems navItems={ infoItems }/>
              <div className="profile__item__name">{ fullName }</div>
            </div>
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
          <PhotoItems photoItems={ viewUserPhoto }/>
        </div>
      </MainLayout>
  )
}


Profile.getInitialProps = async (ctx: MyContext) => {
  const username = ctx.query.username
  try {
    const userInfo = await ctx.apolloClient.query<GetUserInfoQuery>({
      query: GetUserInfoDocument, variables: {username}
    })

    const userPhotos = await ctx.apolloClient.query<ViewUserPhotoQuery>({
      query: ViewUserPhotoDocument,
      variables: {username}
    })
    return {
      getUserInfo: {...userInfo.data!.getUserInfo},
      viewUserPhoto: userPhotos.data!.viewUserPhoto
    }
  } catch (e) {
    redirect(ctx, '/404')
  }
  return {
    props: {}
  }
}


export default Profile
