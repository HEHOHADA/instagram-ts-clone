import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'

@Resolver()
export class FollowResolver {

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async unFollowUser(
      @Ctx(){payload}: MyContext,
      @Arg('userId')userId: string
  ) {

    if (payload.userId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await getRepository(User)
        .createQueryBuilder()
        .relation(User, 'following')
        .of(payload.userId)
        .remove(userId)

    return true
    //
    // const follower = await Follower.findOne({where: {followerId: payload.userId, userId}})
    //
    // const following = await Following.findOne({where: {followingId: userId, userId: payload.userId}})
    //
    // if (!follower || !following) {
    //   throw new AuthenticationError(userNotFound)
    // }
    // await Follower.remove(follower)
    // await Following.remove(following)
    // return true
  }
}