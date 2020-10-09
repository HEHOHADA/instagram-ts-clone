import { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import { CreateCommentType, useCreateCommentMutation } from '@/geterated/apollo'

export const useCommentCreateHandler = () => {
  const [createCommentMutation] = useCreateCommentMutation()
  const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
    try {
      const response = await createCommentMutation({
        variables: {
          data
        },
        update: (cache, {data}) => {
          cache.modify({
            id: `Photo:${  data?.createComment.photoId }`,
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

  return {
    createCommentHandler
  }
}
