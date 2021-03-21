import { Arg, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '@entity/User'
import { RegisterInput } from '@type/user/register/RegisterInput'
import { createConfirmEmail } from '../../helpers/user/createConfirmEmail'
import { sendEmail } from '../../helpers/user/sendEmail'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class RegisterResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(() => User)
  async register(
    @Arg('data') { email, fullName, username, password }: RegisterInput
  ): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await this.userRepository.create({
      username,
      email,
      fullName,
      password: hashedPassword
    }).save()
    await sendEmail(user.email, await createConfirmEmail(user.id), 'Please confirm Email')
    return user
  }
}
