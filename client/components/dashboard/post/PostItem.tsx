import React, { FC, useCallback, useState } from 'react'
import { PostHeader } from './PostHeader'
import { IPhoto } from '../../../interfaces/photo'
import { CommentTools } from './comment/CommentTools'
import { Comments } from './comment/Comments'
import { CreateCommentType, useCreateCommentMutation } from '../../../geterated/apollo'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { IComment } from '../../../interfaces/comment'
import { TextArea } from '../../utils/TextArea'


type PropsType = {
  photo: IPhoto
}

export const PostItem: FC<PropsType> = ({photo}) => {
  const [createComment] = useCreateCommentMutation()

  const [comments, setComments] = useState<IComment[]>(photo.comments)

  const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
    try {
      const response = await createComment({
        variables: {
          data
        }
      })
      if (response && response.data) {
        const newComments = [...comments]
        newComments.push(response.data.createComment as IComment)
        setComments(newComments)
        resetForm()
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
      <div className="dashboard__content">
        <PostHeader
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
          <CommentTools/>

          <div className="content__likes">
            <span>Нравится { photo.likeCount } людям</span>
          </div>
          <Comments comments={ comments }/>
          <div className="content__created">{ new Date(photo.date).toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) }</div>
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
      </div>
  )
}
