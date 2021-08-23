import { Redis } from 'ioredis'
import { userSessionPrefix } from '@helpers/constants'

export const removeAllUsersSession = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(`${userSessionPrefix}${userId}`, 0, -1)

  const promises = []

  for (let i = 0; i < sessionIds.length; i++) {
    promises.push(redis.del(`${userSessionPrefix}${sessionIds[i]}`))
  }

  await Promise.all(promises)
}
