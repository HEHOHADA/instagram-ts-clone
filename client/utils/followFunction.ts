import { ApolloCache, FetchResult, gql, MutationFunctionOptions } from '@apollo/client'
import { Exact } from '../geterated/apollo'

type FollowCallbackType<T> =
    (options?: (MutationFunctionOptions<T, Exact<{ userId: string }>> | undefined))
        => Promise<FetchResult<T>> | void

export function followCallback<T>(followCallback: FollowCallbackType<T>, count: number): (userId: string) => Promise<void> {
  return async (userId: string) => {
    await followCallback({
      variables: {userId},
      update: (cache:ApolloCache<any>) => {
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
        cache.evict({fieldName: 'feed:{}'})
      }
    })
  }
}
