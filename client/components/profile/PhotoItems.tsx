import React, { FC, useMemo } from 'react'
import { splitArray } from '../../utils/splitArray'
import { PhotoItem } from './PhotoItem'
import { IPhoto } from '../../interfaces/photo'

type PropsType = {
  photoItems: Array<IPhoto>
}

export const PhotoItems: FC<PropsType> = ({photoItems}) => {

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
