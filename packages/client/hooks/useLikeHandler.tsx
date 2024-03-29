import { useCallback } from 'react'
import { gql } from '@apollo/client'
import { useLikeMutation } from '@/geterated'
import { Getters } from '@/hoc'


export type LikeGetters = Getters<ReturnType<typeof useLikeHandler>>

export const useLikeHandler = ({ photoId, isLiked }: any) => {
  const [likeMutation] = useLikeMutation()

  const like = useCallback(async () => {
    try {
      await likeMutation({
        variables: {
          photoId
        }, update: (cache: any) => {
          const counting = isLiked ? -1 : 1
          const data = cache.readFragment({
            id: `Photo:${ photoId }`,
            fragment: gql`
                fragment _ on Photo {
                    id
                    likeCount
                    isLiked
                }
            `
          })

          if (data) {
            cache.writeFragment({
              id: `Photo:${ photoId }`,
              fragment: gql`
                  fragment __ on Photo {
                      likeCount
                      isLiked
                  }
              `,
              data: { likeCount: data.likeCount + counting, isLiked: !data.isLiked }
            })
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [isLiked, photoId])

  return {
    like: like
  }
}
