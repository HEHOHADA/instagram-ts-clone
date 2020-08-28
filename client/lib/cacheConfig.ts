import { PaginatedPhotos } from "../geterated/apollo"

export const cacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        photos: {
          keyArgs: [],
          merge(
              existing: PaginatedPhotos | undefined,
              incoming: PaginatedPhotos
          ): PaginatedPhotos {
            return {
              ...incoming,
              photos: [...(existing?.photos || []), ...incoming.photos],
            }
          },
        },
      },
    },
  },
}
