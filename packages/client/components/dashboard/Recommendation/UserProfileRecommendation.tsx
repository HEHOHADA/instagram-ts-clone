import React, { FC } from 'react'
import { IUser } from '@/geterated'
import { UserLink } from '@/components/link'
import { UserProfile, UserInfo, UserInfoName } from '../DashboardStyled'

type ProsType = Pick<IUser, 'fullName' | 'username' | 'pictureUrl'>

export const UserProfileRecommendation: FC<ProsType> = React.memo(({
  pictureUrl,
  username,
  fullName
}) => {
  return (
    <UserProfile>
      <UserLink username={ username } withWrapper>
        <img
          alt={ `Фото профиля ${ username }` }
          src={ pictureUrl as string | undefined } />
      </UserLink>
      <UserInfo>
        <UserLink username={ username } />
        <UserInfoName>{ fullName }</UserInfoName>
      </UserInfo>
    </UserProfile>
  )
})
