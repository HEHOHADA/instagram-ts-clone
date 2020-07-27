import { AuthenticationError } from 'apollo-server-express'
import { Arg, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { redis } from '../../redis'
import { User } from '../../entity/User'
import { ChangePasswordInput } from './types/ChapgePasswordInputType'
import { expiredKeyError, invalidLogin } from './utils/errorMessages'
import { forgotPasswordPrefix } from '../constants/redisPrefix'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User)
  async changePassword(
      // @Ctx()ctx: MyContext,
      @Arg('data'){token, password}: ChangePasswordInput
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

    await user.save()



    return user

  }
}
