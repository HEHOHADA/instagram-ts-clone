import React, { FC } from 'react'
import { IPhoto } from '../../../interfaces/photo'
import { PostItem } from './PostItem'
import { MutationFunctionOptions } from '@apollo/client'
import {
  CreateCommentMutation,
  CreateCommentType,
  DeleteCommentMutation,
  DeleteCommentType,
  Exact,
  LikeMutation
} from '../../../geterated/apollo'

type PropsType = {
  feed: IPhoto[]
  deleteCommentMutation: (options?: (MutationFunctionOptions<DeleteCommentMutation, Exact<{ data: DeleteCommentType }>> | undefined)) => Promise<any>
  createCommentMutation: (options?: (MutationFunctionOptions<CreateCommentMutation, Exact<{ data: CreateCommentType }>> | undefined)) => Promise<any>
  likeMutation: (options?: (MutationFunctionOptions<LikeMutation, Exact<{ photoId: string }>> | undefined)) => Promise<any>
}

export const Posts: FC<PropsType> = ({feed, deleteCommentMutation, createCommentMutation, likeMutation}) => {

  return (
      <>
        { feed.map(photo => (
            <PostItem
                deleteCommentMutation={ deleteCommentMutation }
                likeMutation={ likeMutation }
                createCommentMutation={ createCommentMutation }
                key={ photo.id }
                photo={ photo }/>
        )) }
      </>

  )
}
