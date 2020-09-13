import React from 'react'
import Link from 'next/link'

type PropsType = {
  pictureUrl: string
  id: string
}

export const PhotoItem = React.memo(({pictureUrl, id}: PropsType) => {
  return (
      <div className="profile__photo__container">
        <Link passHref href={ `/p/${ id }` }>
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
