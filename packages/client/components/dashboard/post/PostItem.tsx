import React, { FC } from 'react'

import { PostHeader } from './PostHeader'
import { dateOptions } from '@/utils/config'
import { Comments } from './comment/Comments'
import { CommentTools } from './comment/CommentTools'
import { PhotoItemContainer, PhotoItemType } from '@/hoc/PhotoItemContainer'
import { CreateCommentForm } from '@/components/photo/CreateCommentForm'
import { DeletePhotoGetters } from '@/hooks/useDeletePhoto'
import { PhotoItem } from '@/components/dashboard/post/Posts'
import { PostContainer } from '@/components/dashboard/post/PostStyled'
import { Box } from '@/components/common/Containers'


type PropsType = DeletePhotoGetters & {
  photo: PhotoItem
}

const PostItem: FC<PropsType> = React.memo(({ photo, onDeletePhoto }) => {

  return (
    <PostContainer>
      <PhotoItemContainer
        photo={ photo }
        onDeletePhoto={ onDeletePhoto }>
        { ({
          onOpenModal,
          onLike,
          onCreateComment,
          onDeleteComment
        }: PhotoItemType) => (
          <>
            <PostHeader
              onOpenModal={ onOpenModal }
              isAuthor={ photo.isAuthor }
              pictureUrl={ photo.user.pictureUrl }
              username={ photo.user.username } />
            <Box>
              <img
                alt='Не загрузилось'
                src={ photo.pictureUrl }
                className='content__img__item'
              />
            </Box>

            <div className='content__tools'>
              <CommentTools
                isLiked={ photo.isLiked }
                onLike={ onLike }
              />
              <div className='content__likes'>
                <span>{ photo.postText }</span>
              </div>
              <div className='content__likes'>
                <span>Нравится { photo.likeCount } людям</span>
              </div>
              { photo.comments && <Comments
                onDeleteComment={ onDeleteComment }
                comments={ photo.comments } /> }
              <div
                className='content__created'>{ new Date(parseInt(photo.date)).toLocaleString('ru', dateOptions) }</div>
              <CreateCommentForm
                onCreateComment={ onCreateComment }
                photoId={ photo.id }
              />
            </div>
          </>
        ) }
      </PhotoItemContainer>
    </PostContainer>
  )
})

export default PostItem
