import bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { AuthenticationError, ValidationError } from 'apollo-server-express'

import { User } from '@/entity/User'
import { MyContext } from '@/types/MyContext'
import { LoginInput } from './login/LoginInput'
import { sendRefreshToken } from './auth/sendRefreshToken'
import { LoginResponseType } from './login/LoginResponseType'
import { createAccessToken, createRefreshToken } from './auth/createTokens'
import { confirmEmailError, forgotPasswordLockedError, invalidLogin } from './utils/errorMessages'

@Resolver()
export class LoginResolver {

  @Mutation(() => LoginResponseType)
  async login(
      @Arg('data'){email, password}: LoginInput,
      @Ctx() ctx: MyContext
  ): Promise<LoginResponseType> {

    const user = await User.findOne({where: {email}})

    if (!user) {
      throw new ValidationError(invalidLogin)
    }

    if (!user.confirmed) {
      throw new ValidationError(confirmEmailError)
    }

    if (user.forgotPasswordLocked) {
      throw new AuthenticationError(forgotPasswordLockedError)
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new AuthenticationError(invalidLogin)
    }

    // ctx.req.session!.userId = user.id

    sendRefreshToken(ctx.res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
      user
    }
  }
}
