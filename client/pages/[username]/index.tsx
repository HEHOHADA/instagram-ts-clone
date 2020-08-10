import React, { useMemo } from 'react'
import Link from 'next/link'
import MainLayout from '../../components/MainLayout'
import { MyContext } from '../../interfaces/MyContext'
import { GetUserInfoDocument, GetUserInfoQuery, ViewUserPhotoDocument, ViewUserPhotoQuery } from '../../geterated/apollo'
import redirect from '../../lib/redirect'
import ProfileInfoItems from '../../components/profile/ProfileInfoItems'
import { declOfNum } from '../../utils/declOfNumb'
import { PhotoItems } from '../../components/profile/PhotoItems'

type PropsType = {
  getUserInfo: {
    email: string
    id: string
    username: string
    pictureUrl: string
    fullName: string
    followerCount: number
    followingCount: number
    photoCount: number
    isFollowing: boolean
    isFollowed: boolean
    isCurrentUser: boolean
  },
  viewUserPhoto: Array<{
    pictureUrl: string
    date: Date
    userId: string
    photoId: string
  }>
}

const Profile = ({getUserInfo, viewUserPhoto}: PropsType) => {
  const {
    photoCount,
    followerCount,
    isCurrentUser,
    isFollowed,
    username, followingCount,
    pictureUrl,
    fullName
  } = getUserInfo
  const infoItems = useMemo(() => {
    return [
      {count: photoCount, text: declOfNum(photoCount, ['Публикация', 'Публикации', 'Публикаций'])},
      {count: followerCount, text: declOfNum(followerCount, ['Подписок', 'Подписка', 'Подписки'])},
      {count: followingCount, text: declOfNum(followingCount, ['Подписчик', 'Подписчиков', 'Подписчика'])},
    ]
  }, [photoCount, followerCount])

  return (
      <MainLayout title={ username }>
        <div className="profile container">
          <div className="profile__info">
            <div className="profile__image">
              <div className="profile__image__center">
                <img
                    className="profile__img"
                    src={ pictureUrl }
                    alt=""/>
              </div>
            </div>
            <div className="profile__items">
              <div className="profile__item__header">
                <h2 className="profile__name">{ username }</h2>
                { isCurrentUser ?
                    <Link href="/accounts/settings">
                      <a className="profile__edit">Редиактировать пользователя</a>
                    </Link> : isFollowed ? <button className="profile__edit">Отписаться</button> :
                        <button className="profile__edit">Подписаться</button>
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
