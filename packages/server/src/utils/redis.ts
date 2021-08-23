import Redis, { RedisOptions } from 'ioredis'
import { getUserId } from '@helpers/user/auth/getUserId'

const host = process.env.REDIS_HOST

const options: RedisOptions = {
  host,
  port: 6379
}

const redis = new Redis(options)

export const onConnect = (connectionParams: { authorization: string }) => {
  if (connectionParams.authorization) {
    return {
      userId: getUserId(connectionParams.authorization)
    }
  } else {
    return { userId: null }
  }
}

export { redis }
