import Link from 'next/link'
import React, { FC } from 'react'

type PropsType = {
  username: string
  commentText: string
  id: string
  isAuthor: boolean
  pictureUrl?: string
  onDelete?: (id: string) => Promise<void>
}

export const CommentItem: FC<PropsType> = ({username, pictureUrl, commentText, onDelete, id, isAuthor}) => {
  return (
      <li className="comment__item">
        { pictureUrl && <div className="comment__img">
          <img src={ pictureUrl } alt="picture"/>
        </div> }
        <Link href={ `/${ username }` }>
          <a className="comment__username">{ username }:</a>
        </Link>
        <p className="comment__text">{ commentText }</p>
        { isAuthor && onDelete &&
        <span onClick={ () => onDelete(id) } className="material-icons delete__comment">delete</span> }
      </li>
  )
}
