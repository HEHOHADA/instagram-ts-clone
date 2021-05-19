import { ExpressContext, PubSub } from 'apollo-server-express'

import { redis } from '@utils/redis'
import { createUserLoader } from '@helpers/loader/createUserLoader'
import { createPhotoLoader } from '@helpers/loader/createPhotoLoader'
import { createCommentLoader } from '@helpers/loader/createCommentLoader'

export const createContext = ({ req, res, connection }: ExpressContext) => {
  const pubsub = new PubSub()
  return {
    redis,
    pubsub,
    connection,
    req,
    res,
    userLoader: createUserLoader(),
    commentLoader: createCommentLoader(),
    photoLoader: createPhotoLoader(),
    imageUrl: 'http://192.168.1.145:4000',
    url: req ? `${req.protocol}://${req.get('host')}` : ''
  }
}
