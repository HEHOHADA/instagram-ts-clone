import React, { FC } from 'react'
import { LinkItem } from '@/components/utils/LinkItem'
import { IUser } from '@/geterated'

type ProsType = Pick<IUser, 'fullName' | 'username' | 'pictureUrl'>

export const UserProfileRecommendation: FC<ProsType> = React.memo(({
  pictureUrl,
  username,
  fullName
}) => {
  return (
    <div className='user__profile'>
      <LinkItem
        passHref
        linkClassName='user__img'
        href={ `/${ username }` }
        LinkContent={ <img alt={ `Фото профиля ${ username }` }
                           src={ pictureUrl as string | undefined } /> } />
      <div className='user__info'>
        <LinkItem
          passHref
          href={ `/${ username }` }
          linkClassName='user__username'
          LinkContent={ username } />
        <div className='user__name'>{ fullName }</div>
      </div>
    </div>
  )
})
