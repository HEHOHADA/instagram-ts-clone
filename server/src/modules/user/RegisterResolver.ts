import bcrypt from 'bcryptjs'
import { Arg, Mutation, Resolver } from 'type-graphql'

import { User } from '@/entity/User'
import { sendEmail } from './utils/sendEmail'
import { RegisterInput } from './register/RegisterInput'
import { createConfirmEmail } from './utils/createConfirmEmail'

@Resolver()
export class RegisterResolver {

  @Mutation(() => User)
  async register(
      @Arg('data'){email, fullName, username, password}: RegisterInput
  ): Promise<User | null> {

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      fullName,
      password: hashedPassword
    }).save()
    await sendEmail(user.email, await createConfirmEmail(user.id), 'Please confirm Email')
    return user
  }
}
