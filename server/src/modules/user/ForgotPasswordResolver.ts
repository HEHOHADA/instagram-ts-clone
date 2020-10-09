import { v4 } from 'uuid'
import { Arg, Mutation, Resolver } from 'type-graphql'

import { redis } from '@/redis'
import { User } from '@/entity/User'
import { sendEmail } from './utils/sendEmail'
import ForgotPasswordType from './types/ForgotPasswordType'
import { forgotPasswordPrefix } from '../constants/redisPrefix'
import { forgotPasswordAccountLock } from './utils/forgotPasswordAccountLock'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
      @Arg('email'){email}: ForgotPasswordType
  ) {

    const user = await User.findOne({where: {email}})

    if (!user) {
      return true
    }
    const token = v4()
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24)


    await sendEmail(user.email,
        `${ process.env.FRONTEND_HOST }/user/change-password/${ token }`,
        'Change password')
    await forgotPasswordAccountLock(user.id, redis)
    return !user
  }
}
