import React, { FC } from 'react'
import Link from 'next/link'


type PropsType = {
  username: string
  pictureUrl?: string | null
  isAuthor: boolean
  onOpenModal?: () => void
}

export const PostHeader: FC<PropsType> = React.memo(({username, onOpenModal, pictureUrl}) => {
  return (
      <header className="dashboard__content__header">
        <Link as={ `/${ username }` } href={ `/[username]` }>
          <a className="content__header_img">
            { pictureUrl && <img
                alt="Нет фото"
                className="content__header_image"
                src={ pictureUrl }
            /> }
          </a>
        </Link>
        <Link as={ `/${ username }` } href={ `/[username]` }>
          <a className="content__header__name">{ username }</a>
        </Link>
        <div onClick={ onOpenModal }
             className="content__header__options">
            <span className="material-icons">
                more_horiz
            </span>
        </div>
      </header>
  )
})
