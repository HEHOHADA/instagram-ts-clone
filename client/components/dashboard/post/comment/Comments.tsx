import React, { FC } from 'react'
import { IComment } from '../../../../interfaces/comment'
import { CommentItem } from './CommentItem'


type ProsType = {
  comments: IComment[],
  onDeleteComment: (id: string) => Promise<void>
}

export const Comments: FC<ProsType> = ({comments, onDeleteComment}) => {
  return (
      <div className="content__comments">
        <ul>
          { comments.map(comment => (
              <CommentItem
                  onDelete={onDeleteComment}
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
