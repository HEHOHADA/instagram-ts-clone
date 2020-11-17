import React, { FC } from 'react'
import { LinkItem } from '@/components/utils/LinkItem'


type ProsType = {
  pictureUrl?: string
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
                           src={ pictureUrl }/> }/>
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
