import React from 'react'
import Link from 'next/link'

type PropsType = {
  pictureUrl: string
  id: string
}

export const PhotoItem = React.memo(({pictureUrl, id}: PropsType) => {
  return (
      <div className="profile__photo__container">
        <Link passHref as={ `/p/${ id }` } href={'/p/[photoId]'}>
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
