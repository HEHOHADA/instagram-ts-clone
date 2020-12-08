import React, { FC, useMemo } from 'react'
import { PhotoItem } from './PhotoItem'
import { splitArray } from '@/utils/splitArray'
import { PhotoItemFragment } from '@/geterated/apollo'

type PropsType = {
  photoItems: PhotoItemFragment[]
}

export const PhotoItems: FC<PropsType> = ({photoItems}) => {

  const renderPhotoItem = useMemo(() => {
    const splittedArray = splitArray(photoItems, 3)
    return splittedArray.map((array, i) =>
      (
        <div key={ `profile__photos_${ i }` } className="profile__photos">
          { array.map(item => (
            <PhotoItem
              key={ item.id }
              pictureUrl={ item.pictureUrl }
              id={ item.id }/>
          )) }
        </div>
      )
    )
  }, [photoItems])

  return (
    <>
      { renderPhotoItem }
    </>
  )
}
