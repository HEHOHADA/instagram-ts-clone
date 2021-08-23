import { Repository } from 'typeorm'
import bcrypt from 'bcryptjs'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '@entity/User'
import { RegisterInput } from '@type/user'
import { createConfirmEmail, sendEmail } from '@helpers/user'
import { Service } from 'typedi'

@Resolver()
@Service()
export class RegisterResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(() => User)
  async register(
    @Arg('data') { email, fullName, username, password }: RegisterInput
  ): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await this.userRepository
      .create({
        username,
        email,
        fullName,
        password: hashedPassword
      })
      .save()
    await sendEmail(user.email, await createConfirmEmail(user.id), 'Please confirm Email')
    return user
  }
}
