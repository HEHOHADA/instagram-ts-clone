import React, { FC, useCallback, useState } from 'react'
import { IPhoto } from '../../../interfaces/photo'
import { PostItem } from './PostItem'
import { MutationFunctionOptions } from '@apollo/client'
import {
  CreateCommentMutation,
  CreateCommentType,
  DeleteCommentMutation,
  DeleteCommentType,
  DeletePhotoMutation,
  Exact,
  FeedDocument,
  FeedQuery,
  LikeMutation
} from '../../../geterated/apollo'

export type MutationPostType = {
  deleteCommentMutation: (options?: (MutationFunctionOptions<DeleteCommentMutation, Exact<{ data: DeleteCommentType }>> | undefined)) => Promise<any>
  createCommentMutation: (options?: (MutationFunctionOptions<CreateCommentMutation, Exact<{ data: CreateCommentType }>> | undefined)) => Promise<any>
  likeMutation: (options?: (MutationFunctionOptions<LikeMutation, Exact<{ photoId: string }>> | undefined)) => Promise<any>
}

type PropsType = {
  feed: IPhoto[]
  deletePhotoMutation: (options?: (MutationFunctionOptions<DeletePhotoMutation, Exact<{ id: string }>> | undefined)) => Promise<any>
}

export const Posts: FC<PropsType & MutationPostType> = ({feed, deletePhotoMutation, ...props}) => {
  const [feedPhotos, setFeedPhotos] = useState<Array<IPhoto>>(() => feed)
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: {id},
      update: (cache) => {
        const oldCache: any = cache.readQuery<FeedQuery>({query: FeedDocument})
        if (oldCache) {
          const newArray = [...oldCache.feed].filter((item) => item.id !== id)
          cache.writeQuery<FeedQuery>({query: FeedDocument, data: {feed: newArray}})
          setFeedPhotos(newArray)
        }
      }
    })
  }, [deletePhotoMutation, feedPhotos])
  return (
      <>
        { feedPhotos.map(photo => (
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
