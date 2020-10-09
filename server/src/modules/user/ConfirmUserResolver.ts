import { Arg, Mutation, Resolver } from 'type-graphql'
import { redis } from '@/redis'
import { User } from '@/entity/User'
import { confirmUserPrefix } from '../constants/redisPrefix'

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
      @Arg('token')token: string
  ) {
    const userId = await redis.get(confirmUserPrefix + token)

    if (!userId) {
      return false
    }
    await User.update({id: userId}, {confirmed: true})
    await redis.del(token)
    return true
  }
}
