import React from 'react'

type PropsType = {
  username: string
  commentText: string
}

export const CommentItem = ({username, commentText}: PropsType) => {
  return (
      <li className="comment__item">
        <span className="comment__username">{ username }</span>
        <p className="comment__text">{ commentText }</p>
      </li>
  )
}
