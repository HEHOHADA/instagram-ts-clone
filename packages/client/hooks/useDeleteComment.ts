import { useCallback } from 'react'
import { useDeleteCommentMutation } from '@/geterated'
import { Getters } from '@/hoc'

export type CommentDelete = Getters<ReturnType<typeof useDeleteComment>>

export const useDeleteComment = ({ photoId }: any) => {
  const [deleteCommentMutation] = useDeleteCommentMutation()
  const deleteComment = useCallback(
    async (id: string) => {
      try {
        await deleteCommentMutation({
          variables: { data: { id } },
          update: (cache: any) => {
            cache.modify({
              id: `Photo:${ photoId }`,
              fields: {
                commentCount(cachedValue: any) {
                  return cachedValue - 1
                },
                comments(cachedValue: any) {
                  return [...cachedValue].filter((t) => !t.__ref.includes(id))
                }
              }
            })
            cache.evict({
              id: cache.identify({ __ref: `Comment:${ id }` })
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    [deleteCommentMutation, photoId]
  )

  return {
    deleteComment: deleteComment
  }
}
