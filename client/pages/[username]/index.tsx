import React, { useCallback, useMemo, useRef } from 'react'
import { FetchResult, gql, MutationFunctionOptions } from '@apollo/client'
import MainLayout from '../../components/MainLayout'
import {
  Exact,
  GetUserInfoQuery,
  useFollowUserMutation,
  useGetUserInfoQuery,
  useUnFollowUserMutation,
  useViewUserPhotoQuery
} from '../../geterated/apollo'
import { declOfNum } from '../../utils/declOfNumb'
import { PhotoItems } from '../../components/profile/PhotoItems'
import { ModalRefType, ModalWindowContainer } from '../../components/modal/ModalWindowContainer'
import { SubscriptionModal } from '../../components/modal/SubscriptionModal'
import { FollowButton } from '../../components/profile/FollowButton'
import { ProfileItems } from '../../components/profile/ProfileItems'
import { useRouter } from 'next/router'
import withApollo from '../../lib/withApollo'


export type ProfileItemsType = {
  onClick?: () => void | null | undefined
  count: number
  text: string
}

type FollowCallbackType<T> =
    (options?: (MutationFunctionOptions<T, Exact<{ userId: string }>> | undefined))
        => Promise<FetchResult<T>> | void

const Profile = () => {
  const router = useRouter()
  const {username: queryUserName} = router.query
  const {data} = useGetUserInfoQuery({variables: {username: (queryUserName as string)}})
  const {data: PhotoData} = useViewUserPhotoQuery({variables: {username: (queryUserName as string)}})
  if (!data || !PhotoData) {
    return null
  }

  const modalRef = useRef<ModalRefType>(null)

  const openModal = useCallback(() => {
    modalRef.current?.openModal()
  }, [modalRef])


  const {
    photoCount, followerCount,
    isCurrentUser, id,
    isFollowing, username, followingCount, pictureUrl, fullName
  }: GetUserInfoQuery['getUserInfo'] = data!.getUserInfo

  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()


  function followCallback<T>(followCallback: FollowCallbackType<T>, count: number): (userId: string) => Promise<void> {
    return async (userId: string) => {
      await followCallback({
        variables: {userId},
        update: (cache) => {
          const data = cache.readFragment<{
            id: string,
            isFollowing: boolean,
            followerCount: number
          }>({
            id: `User:${ userId }`,
            fragment: gql`
                fragment _ on User {
                    id
                    isFollowing
                    followerCount
                }
            `,
          })

          if (data) {
            cache.writeFragment({
              id: `User:${ userId }`,
              fragment: gql`
                  fragment __ on User {
                      isFollowing
                      followerCount
                  }
              `,
              data: {followerCount: data.followerCount + count, isFollowing: !data.isFollowing}
            })
          }
          cache.evict({fieldName: 'feed:{}'})
        }
      })
    }
  }

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
        onClick: openModal,
        text: declOfNum((followerCount as number), ['Подписка', 'Подписок', 'Подписки'])
      },
      {
        count: (followingCount as number),
        text: declOfNum((followingCount as number), ['Подписчик', 'Подписчиков', 'Подписчика'])
      },
    ]
  }, [photoCount, followerCount, followingCount])


  return (
      <MainLayout title={ username }>
        <ModalWindowContainer ref={ modalRef }>
          { (ref: ModalRefType) => (<SubscriptionModal { ...ref }/>) }
        </ModalWindowContainer>
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
          <PhotoItems photoItems={ PhotoData?.viewUserPhoto as any }/>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(Profile)
