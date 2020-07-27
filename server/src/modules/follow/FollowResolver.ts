import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { SyntaxError } from 'apollo-server-express'
import { MyContext } from '../../types/MyContext'
import { Follower } from '../../entity/Follower'
import { Following } from '../../entity/Following'
import { somethingWentWrong } from '../user/utils/errorMessages'
import { isAuth } from '../../middleware/isAuthMiddleware'

@Resolver()
export class FollowResolver {

  @Query(() => [Follower])
  async getFollowers(
      @Ctx() ctx: MyContext,
      @Arg('userId', {nullable: true})userId?: string
  ) {
    const id = (userId ?? ctx.payload.userId) as string
    if (!id) {
      throw new SyntaxError(somethingWentWrong)
    }


    return Follower.find({where: {userId: id}, cache: true})
  }

  @Query(() => [Following])
  async getFollowings(
      @Ctx() ctx: MyContext,
      @Arg('userId', {nullable: true})userId?: string
  ) {
    const id = (userId ?? ctx.payload.userId) as string
    if (!id) {
      throw new SyntaxError(somethingWentWrong)
    }
    return Following.find({where: {userId: id}, cache: true})
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async followUser(
      @Ctx(){payload}: MyContext,
      @Arg('userId')userId: string
  ) {
    const follower = await Follower.create({
      userId,
      followerId: payload.userId
    })

    const following = await Following.create({
      followingId: userId,
      userId: payload.userId
    })

    await follower.save()
    await following.save()
    return true
  }
}
