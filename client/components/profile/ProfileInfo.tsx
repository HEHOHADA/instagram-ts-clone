import React, { useMemo } from 'react'
import { ProfileItems } from './ProfileItems'
import { ProfileItemsType } from '@/pages/[username]'
import { declOfNum } from '@/utils/declOfNumb'


export const ProfileInfo = ({
                              username, pictureUrl,
                              openModal,
                              followButton,
                              changeSubs,
                              isFollowing,
                              id, meId,
                              fullName,
                              isCurrentUser, photoCount,
                              followerCount, followingCount
                            }: any) => {

  const infoItems = useMemo<Array<ProfileItemsType>>(() => {
    return [
      {
        count: (photoCount as number),
        text: declOfNum((photoCount as number), ['Публикация', 'Публикации', 'Публикаций'])
      },
      {
        count: (followerCount as number),
        onClick: () => {
          changeSubs('subscribers')
          openModal()
        },
        text: declOfNum((followerCount as number), ['Подписка', 'Подписок', 'Подписки'])
      },
      {
        count: (followingCount as number),
        onClick: () => {
          changeSubs('subscriptions')
          openModal()
        },
        text: declOfNum((followingCount as number), ['Подписчик', 'Подписчиков', 'Подписчика'])
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
