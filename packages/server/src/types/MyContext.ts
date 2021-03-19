import { Redis } from 'ioredis'
import { PubSub } from 'apollo-server-express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import {
  createCommentLoader,
  createUserLoader,
  createPhotoLoader,
  createLikeLoader
} from '@utils/index'

export interface MyContext extends ExpressContext {
  payload: { userId: string | null }
  redis: Redis
  pubsub: PubSub
  userLoader: ReturnType<typeof createUserLoader>
  likeLoader: ReturnType<typeof createLikeLoader>
  commentLoader: ReturnType<typeof createCommentLoader>
  photoLoader: ReturnType<typeof createPhotoLoader>
  url: string
  imageUrl: string
}
