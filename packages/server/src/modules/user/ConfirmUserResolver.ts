import { Arg, Mutation, Resolver } from 'type-graphql'
import { redis } from '@utils/redis'
import { confirmUserPrefix } from '../../helpers/constants/redisPrefix'
import { User } from '@entity/User'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class ConfirmUserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string) {
    const userId = await redis.get(confirmUserPrefix + token)

    if (!userId) {
      return false
    }
    await this.userRepository.update({ id: userId }, { confirmed: true })
    await redis.del(token)
    return true
  }
}
