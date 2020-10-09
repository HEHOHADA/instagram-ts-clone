import React from 'react'
import { Field, Form, Formik } from 'formik'
import { TextArea } from '../utils/TextArea'
import { CreateCommentType } from '@/geterated/apollo'

export const CreateCommentForm = ({photoId, createCommentHandler}: { photoId: string, createCommentHandler: any }) => {
  return (
      <Formik<CreateCommentType>
          onSubmit={ createCommentHandler }
          initialValues={ {commentText: '', photoId: photoId} }
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
  )
}
