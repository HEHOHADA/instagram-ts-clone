import React, { FC } from 'react'
import { IComment } from '../../../../interfaces/comment'
import { CommentItem } from './CommentItem'


type ProsType = {
  comments: IComment[]
}

export const Comments: FC<ProsType> = ({comments}) => {
  return (
      <div className="content__comments">
        <ul>
          { comments.map(comment => (
              <CommentItem
                  key={ comment.id }
                  username={ comment.user.username }
                  commentText={ comment.commentText }
              />
          )) }
        </ul>
      </div>
  )
}
