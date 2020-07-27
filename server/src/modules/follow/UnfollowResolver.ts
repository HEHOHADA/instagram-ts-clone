import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { Follower } from '../../entity/Follower'
import { AuthenticationError } from 'apollo-server-express'
import { userNotFound } from '../user/utils/errorMessages'
import { Following } from '../../entity/Following'
import { isAuth } from '../../middleware/isAuthMiddleware'

@Resolver()
export class FollowResolver {

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async unFollowUser(
      @Ctx(){payload}: MyContext,
      @Arg('userId')userId: string
  ) {

    const follower = await Follower.findOne({where: {followerId: payload.userId, userId}})

    const following = await Following.findOne({where: {followingId: userId, userId: payload.userId}})

    if (!follower || !following) {
      throw new AuthenticationError(userNotFound)
    }
    await Follower.remove(follower)
    await Following.remove(following)
    return true
  }
}
