import React, { FC } from 'react'
import { LinkItem } from '@/components/utils/LinkItem'

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
      <LinkItem
        href={ `/${ username }` }
        linkClassName={ 'comment__username' }
        LinkContent={ `${ username }:` }/>
      <p className="comment__text">{ commentText }</p>
      { isAuthor && onDelete &&
      <span onClick={ () => onDelete(id) }
            className="material-icons delete__comment">delete</span> }
    </li>
  )
}
