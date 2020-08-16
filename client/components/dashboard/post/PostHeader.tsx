import React, { FC } from 'react'
import Link from 'next/link'


type PropsType = {
  username: string
  pictureUrl?: string | null
  isAuthor: boolean
}

export const PostHeader: FC<PropsType> = React.memo(({username, pictureUrl}) => {
  return (
      <header className="dashboard__content__header">
        <Link href={ `/${ username }` }>
          <a className="content__header_img">
            { pictureUrl && <img
                alt="Нет фото"
                className="content__header_image"
                src={ pictureUrl }
            /> }
          </a>
        </Link>
        <Link href={ `/${ username }` }>
          <a className="content__header__name">{ username }</a>
        </Link>
        <div className="content__header__options">
                            <span className="material-icons">
                                more_horiz
                            </span>
        </div>
      </header>
  )
})
