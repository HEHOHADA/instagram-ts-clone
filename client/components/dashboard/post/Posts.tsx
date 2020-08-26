import React, { FC, useCallback } from 'react'
import { IPhoto } from '../../../interfaces/photo'
import { PostItem } from './PostItem'
import { FeedDocument, FeedQuery, useDeletePhotoMutation } from '../../../geterated/apollo'


type PropsType = {
  feed: IPhoto[]
}

export const Posts: FC<PropsType> = ({feed, ...props}) => {
  const [deletePhotoMutation] = useDeletePhotoMutation()
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: {id},
      update: (cache) => {
        const oldCache: any = cache.readQuery<FeedQuery>({query: FeedDocument})
        if (oldCache) {
          const newArray = [...oldCache.feed].filter((item) => item.id !== id)
          cache.writeQuery<FeedQuery>({query: FeedDocument, data: {feed: newArray}})
        }
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
