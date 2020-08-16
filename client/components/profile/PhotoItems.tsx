import React, { useMemo } from 'react'
import { splitArray } from '../../utils/splitArray'
import { PhotoItem } from './PhotoItem'

type PropsType = {
  photoItems: Array<{
    pictureUrl: string
    id: string
    userId: string
    date: Date
  }>
}

export const PhotoItems = ({photoItems}: PropsType) => {

  const renderPhotoItem = useMemo(() => {
    const splitedPhotoArray = splitArray(photoItems, 3)
    return splitedPhotoArray.map((array, i) =>
        (
            <div key={ `profile__photos_${ i }` } className="profile__photos">
              { array.map(item => (
                  <PhotoItem key={ item.id }
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
// <div className="profile__photos">
//   { photoItems.map(item => (
//       <PhotoItem key={ item.photoId }
//                  pictureUrl={ item.pictureUrl }
//                  photoId={ item.photoId }/>
//   )) }
// </div>)
