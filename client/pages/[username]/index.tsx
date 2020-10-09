import React from 'react'
import { useRouter } from 'next/router'

import withApollo from '@/lib/withApollo'
import { useModal } from '@/hooks/useModal'
import MainLayout from '@/components/MainLayout'
import useFollowButton from '@/hooks/useFollowButton'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { PhotoItems } from '@/components/profile/PhotoItems'
import { ProfileInfo } from '@/components/profile/ProfileInfo'
import { SubscriptionModal } from '@/components/modal/SubscriptionModal'
import {
  GetUserInfoQuery,
  PhotoItemFragment,
  useGetUserInfoQuery,
  useMeQuery,
  useViewUserPhotoQuery
} from '@/geterated/apollo'


export type ProfileItemsType = {
  onClick?: () => void | null | undefined
  count: number
  text: string
}

type ModalUserPageType = 'subscribers' | 'subscriptions' | null
type GetUserInfoQueryType = GetUserInfoQuery['getUserInfo']

const Profile = () => {
  const {openModal, ModalWindow} = useModal()
  const router = useRouter()
  const {username: queryUserName} = router.query
  const {data} = useGetUserInfoQuery({variables: {username: (queryUserName as string)}})
  const {data: dataPhoto} = useViewUserPhotoQuery({variables: {username: (queryUserName as string)}})
  const {data: meData} = useMeQuery()
  const {followButton} = useFollowButton()
  let subs: ModalUserPageType = null
  const changeSubs = (subName: ModalUserPageType) => {
    subs = subName
  }
  return (
      <MainLayout title={ data?.getUserInfo.fullName || 'Профиль' }>
        { !data &&
        <h1 style={ {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '40px'
        } }>Такого пользователя нет</h1>
        }
        <ModalWindow>
          { (ref: ModalRefType) => {
            switch (subs) {
              case'subscribers':
                return (<SubscriptionModal
                    id={ data!.getUserInfo.id }
                    userId={ meData?.me?.id }
                    FollowButton={ followButton }
                    subscriber={ true } { ...ref }/>)
              case 'subscriptions':
                return <SubscriptionModal
                    id={ data!.getUserInfo.id }
                    userId={ meData?.me?.id }
                    FollowButton={ followButton }
                    subscriber={ false } { ...ref }/>
              default:
                return null
            }
          } }
        </ModalWindow>
        <div className="profile container">

          { data?.getUserInfo && <ProfileInfo
              meId={ meData?.me?.id }
              followButton={ followButton }
              openModal={ openModal }
              changeSubs={ changeSubs }
              { ...data.getUserInfo } /> }
          <hr/>
          <div className="profile__objects">
            <div className="profile__objects__lin">
              <div className="object__item active">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
            </div>
          </div>
          { dataPhoto?.viewUserPhoto &&
          <PhotoItems photoItems={ dataPhoto.viewUserPhoto as PhotoItemFragment[] }/> }
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(Profile)
