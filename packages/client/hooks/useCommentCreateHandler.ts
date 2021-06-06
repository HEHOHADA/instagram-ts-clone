import { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import { ICreateCommentType, useCreateCommentMutation } from '@/geterated'
import { Getters } from '@/hoc'

export type CreateCommentGetters = Getters<ReturnType<typeof useCommentCreateHandler>>

export const useCommentCreateHandler = () => {
  const [createCommentMutation] = useCreateCommentMutation()
  const createComment = useCallback(
    async (data: ICreateCommentType, { resetForm }: FormikHelpers<any>) => {
      try {
        const response = await createCommentMutation({
          variables: {
            data
          },
          update: (cache, { data }) => {
            cache.modify({
              id: `Photo:${ data?.createComment.photoId }`,
              fields: {
                commentCount(cachedValue) {
                  return cachedValue + 1
                },
                comments(cachedValue) {
                  const commentRef = { __ref: `Comment:${ data?.createComment?.id }` }
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
    },
    []
  )

  return {
    createComment: createComment
  }
}
