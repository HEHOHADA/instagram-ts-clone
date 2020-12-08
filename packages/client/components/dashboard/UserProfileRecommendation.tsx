import React, { FC } from 'react'
import { LinkItem } from '@/components/utils/LinkItem'


type ProsType = {
  pictureUrl?: string | null
  fullName: string
  username: string
}
export const UserProfileRecommendation: FC<ProsType> = React.memo(({pictureUrl, username, fullName}) => {
  return (
    <div className="user__profile">
      <LinkItem
        passHref
        linkClassName="user__img"
        href={ `/${ username }` }
        LinkContent={ <img alt="Фото профиля bulat.khai"
                           src={ pictureUrl as string | undefined }/> }/>
      <div className="user__info">
        <LinkItem
          passHref
          href={ `/${ username }` }
          linkClassName='user__username'
          LinkContent={ username }/>
        <div className="user__name">{ fullName }</div>
      </div>
    </div>
  )
})
