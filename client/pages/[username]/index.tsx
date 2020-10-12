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
import { PhotoItemFragment, useGetUserInfoQuery, useMeQuery, useViewUserPhotoQuery } from '@/geterated/apollo'
import Loading from '@/components/utils/Loading'


export type ProfileItemsType = {
  onClick?: () => void | null | undefined
  count: number
  text: string
}

export type ModalUserPageType = 'subscribers' | 'subscriptions' | null

let subs: ModalUserPageType = null

const Profile = () => {
  const {openModal, ModalWindow} = useModal()
  const router = useRouter()
  const {username: queryUserName} = router.query
  const {data, loading} = useGetUserInfoQuery({variables: {username: (queryUserName as string)}})
  const {data: dataPhoto} = useViewUserPhotoQuery({variables: {username: (queryUserName as string)}})
  const {data: meData} = useMeQuery()
  const {followButton} = useFollowButton()
  const changeSubs = (subName: ModalUserPageType) => {
    subs = subName
    openModal()
  }
  return (
      <MainLayout title={ data?.getUserInfo.fullName || 'Профиль' }>
        { !data && !loading ?
            <h1 style={ {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '40px'
            } }>Такого пользователя нет</h1> : loading ? <Loading/> : null
        }
        <ModalWindow>
          { (ref: ModalRefType) => {
            const modalProps = {
              id: data!.getUserInfo.id,
              userId: meData?.me?.id,
              isCurrent: data!.getUserInfo.isCurrentUser,
              FollowButton: followButton,
              ...ref
            }
            switch (subs) {
              case'subscribers':
                return (<SubscriptionModal
                    { ...modalProps }
                    subscriber={ true }/>)
              case 'subscriptions':
                return <SubscriptionModal
                    { ...modalProps }
                    subscriber={ false }/>
              default:
                return null
            }
          } }
        </ModalWindow>
        <div className="profile container">

          { data?.getUserInfo && <ProfileInfo
              meId={ meData?.me?.id }
              followButton={ followButton }
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
