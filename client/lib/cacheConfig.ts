import { PaginatedPhotos } from '../geterated/apollo'

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
              photos: [...(existing?.photos || []), ...incoming.photos],
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
