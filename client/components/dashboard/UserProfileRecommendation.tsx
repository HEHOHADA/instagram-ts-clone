import React, { FC } from 'react'


type ProsType = {
  pictureUrl?: string | null
  fullName: string
  username: string
}
export const UserProfileRecommendation: FC<ProsType> = React.memo(({pictureUrl, username, fullName}) => {
  return (
      <div className="user__profile">
        <div className="user__img">
          { pictureUrl && <img alt="Фото профиля bulat.khai"
                               src={ pictureUrl }/> }
        </div>
        <div className="user__info">
          <div className="user__username">{ username }</div>
          <div className="user__name">{ fullName }</div>
        </div>
      </div>
  )
})
