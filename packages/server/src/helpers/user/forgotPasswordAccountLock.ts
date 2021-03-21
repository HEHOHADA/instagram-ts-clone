import { Redis } from 'ioredis'

import { User } from '../../../entity/User'
import { removeAllUsersSession } from './removeAllUsersSession'

export const forgotPasswordAccountLock = async (userId: string, redis: Redis) => {
  await User.update({ id: userId }, { forgotPasswordLocked: true })

  return await removeAllUsersSession(userId, redis)
}
