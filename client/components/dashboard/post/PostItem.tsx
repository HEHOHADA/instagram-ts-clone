import React, { FC } from 'react'
import { Comments } from './comment/Comments'
import { CreateCommentType } from '../../../geterated/apollo'
import { Field, Form, Formik } from 'formik'
import { TextArea } from '../../utils/TextArea'
import { dateOptions } from '../../../utils/config'
import { PhotoFeedType } from './Posts'
import { PostHeader } from './PostHeader'
import { PhotoItemContainer, PhotoItemType } from '../../../hoc/PhotoItemContainer'
import { CommentTools } from './comment/CommentTools'


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
                  <Formik<CreateCommentType>
                      onSubmit={ createCommentHandler }
                      initialValues={ {commentText: '', photoId: photo.id} }
                  >
                    { () => (
                        <Form className="comment__create">
                          <Field
                              required
                              placeholder="Введите комментарий"
                              className="comment__add"
                              name="commentText"
                              component={ TextArea }
                          />
                          <button
                              type="submit"
                              className="comment__btn">Отправить
                          </button>
                        </Form>
                    ) }
                  </Formik>
                </div>
              </>
          ) }
        </PhotoItemContainer>
      </div>
  )
})

export default PostItem
