import bcrypt from 'bcryptjs'
import { AuthenticationError, ValidationError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { LoginInput } from '@type/user/login/LoginInput'
import { confirmEmailError, forgotPasswordLockedError, invalidLogin } from '../../helpers/user/errorMessages'
import { sendRefreshToken } from '../../helpers/user/auth/sendRefreshToken'
import { createAccessToken, createRefreshToken } from '../../helpers/user/auth/createTokens'
import { LoginResponseType } from '@type/user/login/LoginResponseType'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class LoginResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }
  @Mutation(() => LoginResponseType)
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponseType> {
    const user = await this.userRepository.findOne({ where: { email } })

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
