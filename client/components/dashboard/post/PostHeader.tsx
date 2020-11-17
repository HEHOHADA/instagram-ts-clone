import Link from 'next/link'
import React, { FC } from 'react'


type PropsType = {
  username: string
  pictureUrl?: string | null
  isAuthor: boolean
  onOpenModal?: () => void
}

export const PostHeader: FC<PropsType> = React.memo(({username, onOpenModal, pictureUrl}) => {
  return (
      <header className="dashboard__content__header">
        <Link href={'/[username]'}
              as={ `/${ username }` }
              passHref >
          <a className="content__header_img">
            { pictureUrl && <img
                alt="Нет фото"
                className="content__header_image"
                src={ pictureUrl }
            /> }
          </a>
        </Link>
        <Link  href={'/[username]'}
               as={ `/${ username }` }
               passHref>
          <a className="content__header__name">{ username }</a>
        </Link>
        <div onClick={(e)=>{
          e.stopPropagation()
          onOpenModal && onOpenModal()
        } }
             className="content__header__options">
            <span className="material-icons">
                more_horiz
            </span>
        </div>
      </header>
  )
})
