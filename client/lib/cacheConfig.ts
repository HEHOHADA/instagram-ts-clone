import { PaginatedPhotos, PaginatedUsersSearch } from '@/geterated/apollo'
export const cacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: [],
          merge(
              existing: PaginatedPhotos | undefined,
              incoming: PaginatedPhotos
          ): PaginatedPhotos {
            return {
              ...incoming,
              items: [...(existing?.items || []), ...incoming.items],
            }
          }
        },
        search:{
          keyArgs: ['subString'],
          merge(
              existing: PaginatedUsersSearch | undefined,
              incoming: PaginatedUsersSearch
          ): PaginatedUsersSearch {
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
