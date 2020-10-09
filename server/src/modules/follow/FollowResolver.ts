import { getConnection } from 'typeorm'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { User } from '@/entity/User'
import { MyContext } from '@/types/MyContext'
import { isAuth } from '@/middleware/isAuthMiddleware'
import { isUserAuthOrUndefined } from '@/middleware/isAuthenticatedMiddleware'

@Resolver()
export class FollowResolver {

  @UseMiddleware(isUserAuthOrUndefined)
  @Query(() => [User])
  async getFollowers(
      @Arg('userId')userId: string
  ) {
    return (await getConnection()
        .getRepository(User)
        .findOne(userId, {
          relations: ['followers']
        }))?.followers
  }

  @UseMiddleware(isUserAuthOrUndefined)
  @Query(() => [User])
  async getFollowings(
      @Arg('userId')userId: string
  ) {
    return (await getConnection()
        .getRepository(User)
        .findOne(userId, {
          relations: ['following']
        }))?.following
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async followUser(
      @Ctx(){payload}: MyContext,
      @Arg('userId')userId: string
  ) {
    if (payload.userId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await getConnection()
        .getRepository(User)
        .createQueryBuilder()
        .relation(User, 'following')
        .of(payload.userId)
        .add(userId)

    return true
  }
}
