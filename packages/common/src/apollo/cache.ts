import { IPaginatedPhotos, IPaginatedUsersSearch } from '../geterated'

export const cacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: [],
          merge(
            existing: IPaginatedPhotos | undefined,
            incoming: IPaginatedPhotos
          ): IPaginatedPhotos {
            return {
              ...incoming,
              items: [...(existing?.items || []), ...incoming.items],
            }
          }
        },
        search: {
          keyArgs: ['subString'],
          merge(
            existing: IPaginatedUsersSearch | undefined,
            incoming: IPaginatedUsersSearch
          ): IPaginatedUsersSearch {
            return {
              ...incoming,
              items: [...(existing?.items || []), ...incoming.items],
            }
          }
        }
      }
    },
    // Photo: {
    //   fields: {
    //     comments: {
    //       merge(existing: any[] | undefined, incoming: any) {
    //         console.log('existing: ', existing)
    //         console.log('incoming: ', incoming)
    //         return [...(existing ?? []), ...incoming]
    //       }
    //     }
    //   }
    // }
    // Mutation: {
    //   fields: {
    //     createComment: {
    //       keyArgs: [],
    //       merge(
    //           existing: any[] | undefined,
    //           incoming: CommentItemFragment,
    //       ): any[] {
    //         return [...existing || [], incoming]
    //       }
    //     }
    //   }
    // }
  }
}
