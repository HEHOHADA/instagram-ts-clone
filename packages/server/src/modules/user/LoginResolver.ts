import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { AuthenticationError, ValidationError } from 'apollo-server-express'

import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { LoginInput, LoginResponseType } from '@type/user'
import { sendRefreshToken, createAccessToken, createRefreshToken } from '@helpers/user'
import {
  confirmEmailError,
  forgotPasswordLockedError,
  invalidLogin
} from '@helpers/user/errorMessages'

@Resolver()
@Service()
export class LoginResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

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
