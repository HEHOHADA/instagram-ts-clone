import React, { FC } from 'react'
import ProfileInfoItems from './ProfileInfoItems'
import { ProfileItemsType } from '@/pages/[username]'
import { LinkItem } from '@/components/utils/LinkItem'


type PropsType = {
  username: string
  isCurrentUser: boolean
  followButton: Element | JSX.Element
  infoItems: Array<ProfileItemsType>
  fullName: string
}

export const ProfileItems: FC<PropsType> =
  ({
     username, infoItems,
     fullName, followButton, isCurrentUser
   }) => {
    return (
      <div className="profile__items">
        <div className="profile__item__header">
          <h2 className="profile__name">{ username }</h2>
          { isCurrentUser ?
            <LinkItem
              linkClassName={ 'profile__edit' } href="/accounts/settings"
              LinkContent={ 'Редиактировать пользователя' }/>
            : followButton
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
    )
  }
