import dynamic from 'next/dynamic'
import React, { FC, useCallback } from 'react'
import { IPhotoItemFragment, useDeletePhotoMutation } from '@instagram/common'

const PostItem = dynamic(() => import('./PostItem'))

export type PhotoFeedType = IPhotoItemFragment &
    { isAuthor: boolean, isLiked: boolean, postText: string }

type PropsType = {
  feed: PhotoFeedType[]
}

export const Posts: FC<PropsType> = ({feed, ...props}) => {
  const [deletePhotoMutation] = useDeletePhotoMutation()
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: {id},
      update: (cache) => {
        cache.evict({id: cache.identify({__ref: `Photo:${ id }`})})
      }
    })
  }, [deletePhotoMutation])
  return (
      <>
        { feed.map(photo => (
            <PostItem
                deletePhoto={ deletePhoto }
                photo={ photo }
                { ...props }
                key={ photo.id }
            />
        )) }
      </>

  )
}
