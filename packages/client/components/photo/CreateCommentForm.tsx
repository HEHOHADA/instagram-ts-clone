import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import { TextArea } from '../utils/TextArea'
import { ICreateCommentType } from '@/geterated'
import { PhotoItemType } from '@/hoc'

type PropsType = Pick<PhotoItemType, 'onCreateComment'> & Pick<ICreateCommentType, 'photoId'>

export const CreateCommentForm: FC<PropsType> = ({ photoId, onCreateComment }) => {
  return (
    <Formik<ICreateCommentType>
      onSubmit={ onCreateComment }
      initialValues={ { commentText: '', photoId } }
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
