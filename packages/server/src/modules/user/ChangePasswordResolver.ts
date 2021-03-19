import { AuthenticationError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '@entity/User'
import { isAuth } from '@middleware/isAuthMiddleware'
import { MyContext } from '@type/MyContext'
import { redis } from '@utils/redis'
import { forgotPasswordPrefix } from '@constants/redisPrefix'
import { ChangeForgotPassword, ChangePassword } from './types/ChangePasswordInputType'
import { expiredKeyError, invalidLogin } from './utils/errorMessages'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User)
  async changeForgotPassword(
    @Arg('data', () => ChangeForgotPassword) { token, password }: ChangeForgotPassword
  ) {
    const userId = await redis.get(forgotPasswordPrefix + token)
    if (!userId) {
      throw new AuthenticationError(expiredKeyError)
    }

    const user = await User.findOne(userId)

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
    const user = await User.findOne(ctx.payload.userId!)

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
