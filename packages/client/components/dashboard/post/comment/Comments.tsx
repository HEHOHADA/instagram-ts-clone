import React, { FC } from 'react'
import { CommentItem } from './CommentItem'
import { ICommentItemFragment, IUserMeFragment } from '@/geterated'
import { CommentsContainer } from '@/components/dashboard/post/comment/CommentStyled'
import { CommentDelete } from '@/hooks'

export type CommentWithUserType = ICommentItemFragment & { user: IUserMeFragment }

type ProsType = Partial<CommentDelete> & {
  comments: CommentWithUserType[],
}

export const Comments: FC<ProsType> = ({ comments, onDeleteComment }) => {
  return (
    <CommentsContainer>
      <ul>
        { comments.map(comment => (
          <CommentItem
            onDeleteComment={ onDeleteComment }
            id={ comment.id }
            pictureUrl={ comment.user.pictureUrl }
            isAuthor={ comment.isAuthor }
            key={ comment.id }
            username={ comment.user.username }
            commentText={ comment.commentText }
          />
        )) }
      </ul>
    </CommentsContainer>
  )
}
