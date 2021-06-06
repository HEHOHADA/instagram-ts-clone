import React, { FC } from 'react'
import { ImageLinkWrapper, PostHeaderOptions, PostHeaderWrapper, UserLinkBlack } from './PostStyled'
import { UserLink } from '@/components/link'
import { IPhoto } from '@/geterated'
import { ModalGetters } from '@/hooks'
import { Icon } from '@/components/icons'

type PropsType =
  Pick<IPhoto['user'], 'username' | 'pictureUrl'>
  & Pick<IPhoto, 'isAuthor'>
  & Pick<ModalGetters, 'onOpenModal'>

export const PostHeader: FC<PropsType> = React.memo(({ username, onOpenModal, pictureUrl }) => {
  return (
    <PostHeaderWrapper>
      <UserLink username={ username }>
        <ImageLinkWrapper $height={ 32 }>
          { pictureUrl && <img
            alt='Нет фото'
            src={ pictureUrl }
          /> }
        </ImageLinkWrapper>
      </UserLink>
      <UserLink username={ username }>
        <UserLinkBlack>{ username }</UserLinkBlack>
      </UserLink>
      <PostHeaderOptions onClick={ (e) => {
        e.stopPropagation()
        onOpenModal?.()
      } }>
        <Icon iconName=' more_horiz' />
      </PostHeaderOptions>
    </PostHeaderWrapper>
  )
})
