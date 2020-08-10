import React from 'react'
import Link from 'next/link'

type PropsType = {
  pictureUrl: string
  photoId: string
}

export const PhotoItem = React.memo(({pictureUrl, photoId}: PropsType) => {
  return (
      <div className="profile__photo__container">
        <Link href={ `/p/${ photoId }` }>
          <a>
            <img
                src={ pictureUrl }
                className="profile__photo"
            />
          </a>
        </Link>
      </div>
  )
})
