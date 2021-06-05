import React, { FC, useMemo } from 'react'

import { ProfileItems } from './ProfileItems'
import { ModalUserPageType, ProfileItemsType } from '@/pages/[username]'
import { declOfNum } from '@/helpers/strings/declOfNumb'
import { IGetUserInfoQuery } from '@/geterated'

type GetUserInfoQueryType = IGetUserInfoQuery['getUserInfo']

type PropsType = GetUserInfoQueryType & {
  followButton: (isFollowing: boolean, id: string, userId?: (string | undefined)) => JSX.Element
  changeSubs: (subs: ModalUserPageType) => void
  meId?: string
}

export const ProfileInfo: FC<PropsType> = ({
                                             username, pictureUrl,
                                             followButton,
                                             changeSubs,
                                             isFollowing,
                                             id, meId,
                                             fullName,
                                             isCurrentUser, photoCount,
                                             followerCount, followingCount
                                           }) => {

  const infoItems = useMemo<Array<ProfileItemsType>>(() => {
    return [
      {
        count: (photoCount as number),
        text: declOfNum((photoCount as number), ['Публикация', 'Публикации', 'Публикаций'])
      },
      {
        count: (followerCount as number),
        onClick: (e) => {
          e.stopPropagation()
          changeSubs('subscribers')
        },
        text: declOfNum((followerCount as number), ['Подписчик', 'Подписчиков', 'Подписчика'])
      },
      {
        count: (followingCount as number),
        onClick: (e) => {
          e.stopPropagation()
          changeSubs('subscriptions')
        },
        text: declOfNum((followingCount as number), ['Подписка', 'Подписок', 'Подписки'])
      },
    ]
  }, [photoCount, followerCount, followingCount])
  return (
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
            followButton={ followButton(isFollowing, id, meId) }
            infoItems={ infoItems }
            fullName={ fullName }/>
      </div>)
}
