import { v4 } from 'uuid'
import { redis } from '@utils/redis'
import { confirmUserPrefix } from '../constants/redisPrefix'

export const createConfirmEmail = async (userId: string) => {
  const token = v4()

  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24)

  return `${process.env.FRONTEND_HOST}/user/confirm/${token}`
}
