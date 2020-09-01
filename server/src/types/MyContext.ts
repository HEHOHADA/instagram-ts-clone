import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import { createUserLoader } from '../utils/createUserLoader'
import { createLikeLoader } from '../utils/createLikeLoader'
import { createCommentLoader } from '../utils/createCommentLoader'
import { createPhotoLoader } from '../utils/createPhotoLoader'
import { PubSub } from 'apollo-server-express'

export interface MyContext {
  req: Request
  res: Response
  payload: { userId: string | null }
  redis: Redis
  pubsub: PubSub
  userLoader: ReturnType<typeof createUserLoader>
  likeLoader: ReturnType<typeof createLikeLoader>
  commentLoader: ReturnType<typeof createCommentLoader>
  photoLoader: ReturnType<typeof createPhotoLoader>
  url: string
}
