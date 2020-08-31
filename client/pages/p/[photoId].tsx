import React from 'react'
import MainLayout from '../../components/MainLayout'
import withApollo from '../../lib/withApollo'
import { CreateCommentType, useViewPhotoByIdQuery } from '../../geterated/apollo'
import { useRouter } from 'next/router'
import { PostHeader } from '../../components/dashboard/post/PostHeader'
import { CommentTools } from '../../components/dashboard/post/comment/CommentTools'
import { Comments } from '../../components/dashboard/post/comment/Comments'
import { Field, Form, Formik } from 'formik'
import { TextArea } from '../../components/utils/TextArea'

const PhotoViewPost = () => {
  const router = useRouter()
  const url = typeof router.query.photoId === 'string' ? router.query.photoId : -1
  const {data} = useViewPhotoByIdQuery({
    skip: url === -1,
    variables: {
      id: url as string
    }
  })

  console.log(data)
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
                  <div className="dashboard__content">
                    <div className="content__img">
                      <img
                          alt="Не загрузилось"
                          src={ data.viewPhotoById.pictureUrl }
                          className="content__img__item" sizes="610px"
                      />
                    </div>
                  </div>
                  <div className="content__img__info">
                    <PostHeader
                        isAuthor={ data.viewPhotoById.isAuthor }
                        pictureUrl={ data.viewPhotoById.user.pictureUrl }
                        username={ data.viewPhotoById.user.username }/>
                    <div className="content__img__comments"> { data.viewPhotoById.comments
                    && <Comments
                        comments={ data.viewPhotoById.comments }/> }</div>
                    <div className="content__tools">
                      <CommentTools
                          isLiked={ data.viewPhotoById.isLiked }
                      />
                      <div className="content__likes">
                        <span>{ data.viewPhotoById.postText }</span>
                      </div>
                      <div className="content__likes">
                        <span>Нравится { data.viewPhotoById.likeCount } людям</span>
                      </div>

                      <div className="content__created">dsadsa</div>
                      <Formik<CreateCommentType>
                          onSubmit={ () => {
                          } }
                          initialValues={ {commentText: '', photoId: data.viewPhotoById.id} }
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
                </div>
            ) }
      </MainLayout>
  )
}

export default withApollo({ssr: true})(PhotoViewPost)
