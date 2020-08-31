import React, { useCallback } from 'react'
import { CreateCommentType, useCreateCommentMutation } from '../../geterated/apollo'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextArea } from '../utils/TextArea'

export const CreateCommentForm = ({photoId}: { photoId: string }) => {

  const [createCommentMutation] = useCreateCommentMutation()
  const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
    try {
      const response = await createCommentMutation({
        variables: {
          data
        },

        update: (cache, {data}) => {
          cache.modify({
            id: `Photo:${ photoId }`,
            fields: {
              commentCount(cachedValue) {
                return cachedValue + 1
              },
              comments(cachedValue) {
                const commentRef = {'__ref': `Comment:${ data?.createComment?.id }`}
                return [...cachedValue, commentRef]
              }
            }
          })
        }
      })
      if (response && response.data) {
        resetForm()
      }
    } catch (e) {
      console.log(e)
    }
  }, [])
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
