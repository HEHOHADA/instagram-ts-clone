import React, { FC } from 'react'

import { PhotoFeedType } from './Posts'
import { PostHeader } from './PostHeader'
import { dateOptions } from '@/utils/config'
import { Comments } from './comment/Comments'
import { CommentTools } from './comment/CommentTools'
import { PhotoItemContainer, PhotoItemType } from '@/hoc/PhotoItemContainer'
import { CreateCommentForm } from '@/components/photo/CreateCommentForm'


type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
}

const PostItem: FC<PropsType> = React.memo(({photo, deletePhoto}) => {

  return (
      <div className="dashboard__content">
        <PhotoItemContainer
            photo={ photo }
            deletePhoto={ deletePhoto }>
          { ({
               openModal,
               onLikeHandler,
               createCommentHandler,
               onDeleteComment
             }: PhotoItemType) => (
              <>
                <PostHeader
                    onOpenModal={ openModal }
                    isAuthor={ photo.isAuthor }
                    pictureUrl={ photo.user.pictureUrl }
                    username={ photo.user.username }/>
                <div className="content__img">
                  <img
                      alt="Не загрузилось"
                      src={ photo.pictureUrl }
                      className="content__img__item" sizes="610px"
                  />
                </div>

                <div className="content__tools">
                  <CommentTools
                      isLiked={ photo.isLiked }
                      onLike={ onLikeHandler }
                  />
                  <div className="content__likes">
                    <span>{ photo.postText }</span>
                  </div>
                  <div className="content__likes">
                    <span>Нравится { photo.likeCount } людям</span>
                  </div>
                  { photo.comments
                  && <Comments
                      onDeleteComment={ onDeleteComment }
                      comments={ photo.comments }/> }
                  <div
                      className="content__created">{ new Date(parseInt(photo.date)).toLocaleString('ru', dateOptions) }</div>
                  <CreateCommentForm
                      createCommentHandler={createCommentHandler}
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
