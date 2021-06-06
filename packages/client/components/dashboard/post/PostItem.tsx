import React, { FC } from 'react'

import { PostHeader } from './PostHeader'
import { dateOptions } from '@/utils/config'
import { Comments } from './comment/Comments'
import { CommentTools } from './comment/CommentTools'
import { PhotoItemContainer, PhotoItemType } from '@/hoc/PhotoItemContainer'
import { CreateCommentForm } from '@/components/photo/CreateCommentForm'
import { DeletePhotoGetters } from '@/hooks/useDeletePhoto'
import { PhotoItem } from '@/components/dashboard/post/Posts'


type PropsType = DeletePhotoGetters & {
  photo: PhotoItem
}

const PostItem: FC<PropsType> = React.memo(({ photo, onDeletePhoto }) => {

  return (
    <div className='dashboard__content'>
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
            <div className='content__img'>
              <img
                alt='Не загрузилось'
                src={ photo.pictureUrl }
                className='content__img__item' sizes='610px'
              />
            </div>

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
              { photo.comments
              && <Comments
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
    </div>
  )
})

export default PostItem
