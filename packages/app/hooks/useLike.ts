import { useCallback } from 'react'
import { gql, useMutation } from '@apollo/client'
import { LikeDocument, useLikeMutation } from '@instagram/common'


export const useLikeHandler = () => {
  const [likeMutation] = useMutation(LikeDocument)

  const onLikeHandler = useCallback(async (photoId: string, isLiked: boolean) => {
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
            `,
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
              data: {likeCount: data.likeCount + counting, isLiked: !data.isLiked}
            })
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    onLikeHandler
  }
}
