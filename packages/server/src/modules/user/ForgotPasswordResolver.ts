import { v4 } from 'uuid'
import { Repository } from 'typeorm'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { redis } from '@utils/redis'
import { User } from '@entity/User'
import { sendEmail } from '@helpers/user/sendEmail'
import { forgotPasswordPrefix } from '@helpers/constants'
import { forgotPasswordAccountLock } from '@helpers/user'
import ForgotPasswordType from '@type/user/ForgotPasswordType'

@Resolver()
export class ForgotPasswordResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') { email }: ForgotPasswordType) {
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      return true
    }
    const token = v4()
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24)

    await sendEmail(
      user.email,
      `${process.env.FRONTEND_HOST}/user/change-password/${token}`,
      'Change password'
    )
    await forgotPasswordAccountLock(user.id, redis)

    return !user
  }
}
