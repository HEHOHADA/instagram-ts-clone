import bcrypt from 'bcryptjs'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import { AuthenticationError } from 'apollo-server-express'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { redis } from '@utils/redis'
import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { forgotPasswordPrefix } from '@helpers/constants'
import { expiredKeyError, invalidLogin } from '@helpers/user'
import { ChangeForgotPassword, ChangePassword } from '@type/user'

@Resolver()
@Service()
export class ChangePasswordResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(() => User)
  async changeForgotPassword(
    @Arg('data', () => ChangeForgotPassword) { token, password }: ChangeForgotPassword
  ) {
    const userId = await redis.get(forgotPasswordPrefix + token)
    if (!userId) {
      throw new AuthenticationError(expiredKeyError)
    }

    const user = await this.userRepository.findOne(userId)

    if (!user) {
      throw new AuthenticationError(invalidLogin)
    }

    await redis.del(forgotPasswordPrefix + token)

    user.password = await bcrypt.hash(password, 12)
    user.forgotPasswordLocked = false
    await user.save()

    return user
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async changePassword(
    @Ctx() ctx: MyContext,
    @Arg('data') { password, oldPassword }: ChangePassword
  ) {
    const user = await this.userRepository.findOne(ctx.payload.userId!)

    if (!user) {
      throw new AuthenticationError(invalidLogin)
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new AuthenticationError(invalidLogin)
    }

    user.password = await bcrypt.hash(password, 12)

    await user.save()

    return user
  }
}
