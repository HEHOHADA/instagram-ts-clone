import React, { FC } from 'react'
import { CommentItem } from './CommentItem'
import { ICommentItemFragment, IUserMeFragment } from '@/geterated'

export type CommentWithUserType = ICommentItemFragment & { user: IUserMeFragment }

type ProsType = {
  comments: CommentWithUserType[],
  onDeleteComment?: (id: string) => Promise<void>
}

export const Comments: FC<ProsType> = ({comments, onDeleteComment}) => {
  return (
      <div className="content__comments">
        <ul>
          { comments.map(comment => (
              <CommentItem
                  onDelete={ onDeleteComment }
                  id={ comment.id }
                  isAuthor={ comment.isAuthor }
                  key={ comment.id }
                  username={ comment.user.username }
                  commentText={ comment.commentText }
              />
          )) }
        </ul>
      </div>
  )
}
