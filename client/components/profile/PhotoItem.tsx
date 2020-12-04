import React from 'react'
import { LinkItem } from '@/components/utils/LinkItem'

type PropsType = {
  pictureUrl: string
  id: string
}

export const PhotoItem = React.memo(({pictureUrl, id}: PropsType) => {
  return (
    <div className="profile__photo__container">
      <LinkItem
        passHref
        as={ `/p/${ id }` }
        href={ '/p/[photoId]' }
        LinkContent={ <img
          src={ pictureUrl }
          className="profile__photo"
          alt={ 'Профиль' }/> }/>
    </div>
  )
})
