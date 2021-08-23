import React, { useRef } from 'react'
import { useRouter } from 'next/router'

import withApollo from '@/lib/withApollo'
import { useModal } from '@/hooks/useModal'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ModalRefType } from '@/hoc/ModalWindowContainer'
import { PhotoItems } from '@/components/profile/PhotoItems'
import { ProfileInfo } from '@/components/profile/ProfileInfo'
import { SubscriptionModal } from '@/components/modal/SubscriptionModal'
import Loading from '@/components/utils/Loading'
import { FollowButton } from '@/components/follow/FollowButton'
import {
  useGetUserInfoQuery,
  useMeQuery,
  useViewUserPhotoQuery
} from '@/geterated'

export type ProfileItemsType = {
  onClick?: (e?: any) => void | null
  count: number
  text: string
}

export type ModalUserPageType = 'subscribers' | 'subscriptions' | null

const Profile = () => {
  const { openModal, ModalWindow } = useModal()
  const router = useRouter()
  const subs = useRef<ModalUserPageType>(null)
  const { username: queryUserName } = router.query
  const {
    data,
    loading
  } = useGetUserInfoQuery({ variables: { username: (queryUserName as string) } })
  const { data: dataPhoto } = useViewUserPhotoQuery({ variables: { username: (queryUserName as string) } })
  const { data: meData } = useMeQuery()

  const changeSubs = (subName: ModalUserPageType) => {
    subs.current = subName
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
        } }>Такого пользователя нет</h1> : loading ? <Loading /> : null
      }
      <ModalWindow>
        { (refProps: ModalRefType) => {
          const modalProps = {
            id: data!.getUserInfo.id,
            userId: meData?.me?.id,
            isCurrent: data!.getUserInfo.isCurrentUser,
            FollowButton,
            ...refProps
          }
          switch (subs.current) {
            case'subscribers':
              return (<SubscriptionModal
                { ...modalProps }
                subscriber />)
            case 'subscriptions':
              return <SubscriptionModal
                { ...modalProps }
                subscriber={ false } />
            default:
              return null
          }
        } }
      </ModalWindow>
      <div className='profile container'>
        { data?.getUserInfo &&
        <ProfileInfo
          meId={ meData?.me?.id }
          changeSubs={ changeSubs }
          { ...data.getUserInfo } /> }
        <hr />
        <div className='profile__objects'>
          <div className='profile__objects__lin'>
            <div className='object__item active'>Публикация</div>
            <div className='object__item'>Сохраненное</div>
            <div className='object__item'>Отметки</div>
            <div className='object__item'>IGTV</div>
          </div>
        </div>
        { dataPhoto?.viewUserPhoto &&
        <PhotoItems photoItems={ dataPhoto.viewUserPhoto } /> }
      </div>
    </MainLayout>
  )
}


export default withApollo({ ssr: true })(Profile)
