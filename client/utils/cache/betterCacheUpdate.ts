import { DocumentNode } from '@apollo/client'
import { ApolloCache } from '@apollo/client/cache'
import { FetchResult } from '@apollo/client/link/core'

export function betterUpdate<T>(cache: ApolloCache<T>, mutationResult?: FetchResult<T>) {
  return (id: string,
          fragment: DocumentNode,
          data: any) => {
    const cachedItems = cache.readFragment({
      id,
      fragment
    })
    if (cachedItems) {
      cache.writeFragment({
        id,
        fragment,
        data
      })
    }
    return mutationResult
    // const data = cache.readFragment({
    //   id: `Photo:${ photo.id }`,
    //   fragment: gql`
    //       fragment _ on Photo {
    //           id
    //           likeCount
    //           isLiked
    //       }
    //   `,
    // })

    // if (data) {
    //   cache.writeFragment({
    //     id: `Photo:${ photo.id }`,
    //     fragment: gql`
    //         fragment __ on Photo {
    //             likeCount
    //             isLiked
    //         }
    //     `,
    //     data: {likeCount: data.likeCount + counting, isLiked: !data.isLiked}
    //   })
    // }
  }
}
