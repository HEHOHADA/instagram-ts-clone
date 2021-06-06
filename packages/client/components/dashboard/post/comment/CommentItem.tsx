import React, { FC } from 'react'
import { CommentContainer, CommentIcon, CommentText, CommentUserLink } from './CommentStyled'
import { ImageWrapper } from '@/components/nav/NavbarItems/NavbarItemStyled'
import { Icon } from '@/components/icons'
import { UserLink } from '@/components/link'
import { IComment } from '@/geterated'
import { CommentDelete } from '@/hooks'

type PropsType =
  Pick<IComment, 'id' | 'isAuthor' | 'commentText'>
  & Pick<IComment['user'], 'username' | 'pictureUrl'>
  & Partial<CommentDelete>

export const CommentItem: FC<PropsType> = (props) => {
  const {
    username,
    pictureUrl,
    commentText,
    onDeleteComment,
    id,
    isAuthor
  } = props

  return (
    <CommentContainer>
      { pictureUrl &&
      <ImageWrapper $height={ 20 }>
        <img src={ pictureUrl } alt='picture' />
      </ImageWrapper> }
      <UserLink username={ username }><CommentUserLink>{ username }:</CommentUserLink></UserLink>
      <CommentText>{ commentText }</CommentText>
      { isAuthor && onDeleteComment &&
      <Icon iconName='delete' wrapper={ CommentIcon } onClick={ () => onDeleteComment(id) } /> }
    </CommentContainer>
  )
}
