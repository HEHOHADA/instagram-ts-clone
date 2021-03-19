import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { MyContext } from '../../types/MyContext'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { User } from '../../entity/User'

@Resolver()
export class FollowResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async unFollowUser(@Ctx() { payload }: MyContext, @Arg('userId') userId: string) {
    if (payload.userId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'following')
      .of(payload.userId)
      .remove(userId)

    return true
  }
}
