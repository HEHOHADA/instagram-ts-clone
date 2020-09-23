import React, { useCallback } from 'react'
import MainLayout from '../../components/MainLayout'
import withApollo from '../../lib/withApollo'
import {
  CreateCommentType,
  useDeletePhotoMutation,
  useViewPhotoByIdQuery,
  ViewPhotoByIdQuery
} from '../../geterated/apollo'
import { useRouter } from 'next/router'
import { PostHeader } from '../../components/dashboard/post/PostHeader'
import { CommentTools } from '../../components/dashboard/post/comment/CommentTools'
import { Comments } from '../../components/dashboard/post/comment/Comments'
import { Field, Form, Formik } from 'formik'
import { TextArea } from '../../components/utils/TextArea'
import { PhotoItemContainer, PhotoItemType } from '../../hoc/PhotoItemContainer'

type ViewPhotoByIdType = ViewPhotoByIdQuery['viewPhotoById']

const PhotoViewPost = () => {
  const router = useRouter()
  const [deletePhotoMutation] = useDeletePhotoMutation()
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: {id},
      update: (cache) => {
        cache.evict({id: cache.identify({__ref: `Photo:${ id }`})})
      }
    })
  }, [deletePhotoMutation])
  const url = typeof router.query.photoId === 'string' ? router.query.photoId : -1
  const {data} = useViewPhotoByIdQuery({
    skip: url === -1,
    variables: {
      id: url as string
    }
  })

  const {
    pictureUrl,
    user, isLiked, isAuthor,
    likeCount,
    postText, id, comments
  }: ViewPhotoByIdType = data!.viewPhotoById

  return (
      <MainLayout title={ 'Photo by ...' }>
        { !data ?
            <h1 style={ {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '40px'
            } }>Такого поста нет</h1> : (
                <div className="photo__container">
                  <PhotoItemContainer
                      photo={ data.viewPhotoById }
                      deletePhoto={ deletePhoto }>
                    { ({
                         openModal, onLikeHandler,
                         onDeleteComment,
                         createCommentHandler
                       }: PhotoItemType) => (
                        <>
                          <div className="content__img">
                            <img
                                alt="Не загрузилось"
                                src={ pictureUrl }
                                className="content__img__item" sizes="610px"
                            />
                          </div>
                          <div className="content__img__info">
                            <PostHeader
                                onOpenModal={ openModal }
                                isAuthor={ isAuthor }
                                pictureUrl={ user.pictureUrl }
                                username={ user.username }/>
                            <div className="content__img__comments">
                              { comments && <Comments
                                  onDeleteComment={ onDeleteComment }
                                  comments={ comments }/> }
                            </div>
                            <div className="content__tools">
                              <CommentTools
                                  onLike={ onLikeHandler }
                                  isLiked={ isLiked }
                              />
                              <div className="content__likes">
                                <span>{ postText }</span>
                              </div>
                              <div className="content__likes">
                                <span>Нравится { likeCount } людям</span>
                              </div>

                              <div className="content__created">dsadsa</div>
                              <Formik<CreateCommentType>
                                  onSubmit={ createCommentHandler }
                                  initialValues={ {commentText: '', photoId: id} }
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
                          </div>
                        </>
                    ) }
                  </PhotoItemContainer>
                </div>
            ) }
      </MainLayout>
  )
}

export default withApollo({ssr: true})(PhotoViewPost)
