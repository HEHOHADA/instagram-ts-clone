import { ApolloCache, gql } from '@apollo/client'
import { IFollowUserMutationFn, IUnFollowUserMutationFn } from '@instagram/common'

type FollowCallbackType = IUnFollowUserMutationFn | IFollowUserMutationFn

export function followCallback(followCallback: FollowCallbackType, count: number): (userId: string, id?: string) => Promise<void> {
  return async (userId: string, id?: string) => {
    await followCallback({
      variables: {userId},
      update: (cache: ApolloCache<any>) => {
        const data = cache.readFragment<{
          id: string,
          isFollowing: boolean,
          followerCount: number
        }>({
          id: `User:${ userId }`,
          fragment: gql`
              fragment _ on User {
                  id
                  isFollowing
                  followerCount
              }
          `,
        })
        if (data) {
          cache.writeFragment({
            id: `User:${ userId }`,
            fragment: gql`
                fragment __ on User {
                    isFollowing
                    followerCount
                }
            `,
            data: {followerCount: data.followerCount + count, isFollowing: !data.isFollowing}
          })
        }
        cache.evict({fieldName:'getFollowers'})
        cache.evict({fieldName:'getFollowings'})
        cache.modify({
          id: `User:${ id }`,
          fields: {
            followingCount(cached) {
              return cached + count
            }
          }
        })
        cache.evict({fieldName: 'feed:{}'})
      }
    })
  }
}
