import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { User } from '@entity/User'
import { isAuth } from '@middleware/isAuthMiddleware'
import { MyContext } from '@type/MyContext'
import { Service } from 'typedi'

@Resolver()
@Service()
export class FollowResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async unFollowUser(@Ctx() { payload }: MyContext, @Arg('userId') userId: string) {
    if (payload.userId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'following')
      .of(payload.userId)
      .remove(userId)

    return true
  }
}
