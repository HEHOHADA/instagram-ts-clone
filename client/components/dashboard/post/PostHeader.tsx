import React, { FC } from 'react'


type PropsType = {
  username: string
  pictureUrl?: string | null
}

export const PostHeader: FC<PropsType> = ({username, pictureUrl}) => {
  return (
      <header className="dashboard__content__header">
        <div className="content__header_img">
          { pictureUrl && <img
              alt="Нет фото"
              className="content__header_image"
              src={ pictureUrl }
          /> }
        </div>
        <div className="content__header__name">{ username }</div>
        <div className="content__header__options">
                            <span className="material-icons">
                                more_horiz
                            </span>
        </div>
      </header>
  )
}
