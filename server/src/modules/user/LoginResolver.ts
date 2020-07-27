import bcrypt from 'bcryptjs'
import { AuthenticationError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { LoginInput } from './login/LoginInput'
import { MyContext } from '../../types/MyContext'
import { confirmEmailError, forgotPasswordLockedError, invalidLogin } from './utils/errorMessages'
import { sendRefreshToken } from './auth/sendRefreshToken'
import { createAccessToken, createRefreshToken } from './auth/createTokens'
import { LoginResponseType } from './login/LoginResponseType'

@Resolver()
export class LoginResolver {

  @Mutation(() => LoginResponseType)
  async login(
      @Arg('data'){email, password}: LoginInput,
      @Ctx() ctx: MyContext
  ): Promise<LoginResponseType> {

    const user = await User.findOne({where: {email}})

    if (!user) {
      throw new AuthenticationError(invalidLogin)
    }

    if (!user.confirmed) {
      throw new AuthenticationError(confirmEmailError)
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
