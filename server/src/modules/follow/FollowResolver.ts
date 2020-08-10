import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm'

@Resolver()
export class FollowResolver {
  //
  // @Query(() => [Follow])
  // async getFollowers(
  //     @Ctx() ctx: MyContext,
  //     @Arg('userId', {nullable: true})userId?: string
  // ) {
  //   const id = (userId ?? ctx.payload.userId) as string
  //   if (!id) {
  //     throw new SyntaxError(somethingWentWrong)
  //   }
  //
  //   return Follow.find({where: {userId: id}, cache: true})
  // }

  // @Query(() => [Follow])
  // async getFollowings(
  //     @Ctx() ctx: MyContext,
  //     @Arg('userId', {nullable: true})userId?: string
  // ) {
  //   const id = (userId ?? ctx.payload.userId) as string
  //   if (!id) {
  //     throw new SyntaxError(somethingWentWrong)
  //   }
  //   return Following.find({where: {userId: id}, cache: true})
  // }

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
