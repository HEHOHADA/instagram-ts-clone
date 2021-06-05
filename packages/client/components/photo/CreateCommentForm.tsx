import React, { FC } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextArea } from '../utils/TextArea'
import { ICreateCommentType } from '@/geterated'


type PropsType = {
  photoId: string,
  createCommentHandler: (data: ICreateCommentType, { resetForm }: FormikHelpers<ICreateCommentType>) => Promise<void>
}

export const CreateCommentForm: FC<PropsType> = ({ photoId, createCommentHandler }) => {
  return (
    <Formik<ICreateCommentType>
      onSubmit={ createCommentHandler }
      initialValues={ { commentText: '', photoId: photoId } }
    >
      { () => (
        <Form className='comment__create'>
          <Field
            required
            placeholder='Введите комментарий'
            className='comment__add'
            name='commentText'
            component={ TextArea }
          />
          <button
            type='submit'
            className='comment__btn'>
            Отправить
          </button>
        </Form>
      ) }
    </Formik>
  )
}
