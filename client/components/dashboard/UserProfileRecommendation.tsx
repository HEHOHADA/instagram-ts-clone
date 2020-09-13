import React, { FC } from 'react'
import Link from 'next/link'


type ProsType = {
  pictureUrl?: string | null
  fullName: string
  username: string
}
export const UserProfileRecommendation: FC<ProsType> = React.memo(({pictureUrl, username, fullName}) => {
  return (
      <div className="user__profile">
        <Link passHref href={ `/${ username }` } >
          <a className="user__img">
            { pictureUrl && <img alt="Фото профиля bulat.khai"
                                 src={ pictureUrl }/> }
          </a>
        </Link>
        <div className="user__info">
          <Link passHref href={ `/${ username }` }>
            <a className="user__username">{ username }</a>
          </Link>
          <div className="user__name">{ fullName }</div>
        </div>
      </div>
  )
})
