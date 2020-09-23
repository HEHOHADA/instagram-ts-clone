import { useDeleteCommentMutation } from '../geterated/apollo'
import { useCallback } from 'react'

export const useCommentDeleteHandler = ({photoId}: any) => {
  const [deleteCommentMutation] = useDeleteCommentMutation()
  const onDeleteComment = useCallback(async (id: string) => {
    try {
      await deleteCommentMutation({
        variables: {data: {id}},
        update: (cache: any) => {
          cache.modify({
            id: `Photo:${ photoId }`,
            fields: {
              commentCount(cachedValue: any) {
                return cachedValue - 1
              },
              comments(cachedValue: any) {
                return [...cachedValue].filter(t => !t.__ref.includes(id))
              }
            }
          })
          cache.evict({
            id: cache.identify({__ref: `Comment:${ id }`})
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [photoId])

  return {
    onDeleteComment
  }
}
