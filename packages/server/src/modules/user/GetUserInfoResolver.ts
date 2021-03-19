import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { ApolloError } from 'apollo-server-express'
import { getConnection } from 'typeorm'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'
import { isUserAuthOrUndefined } from '../../middleware/isAuthenticatedMiddleware'

@Resolver(() => User)
export class GetUserInfoResolver {
  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  isCurrentUser(@Root() user: User, @Ctx() { payload: { userId } }: MyContext) {
    return user.id === userId
  }

  @Query(() => User)
  async getUserInfo(@Arg('username') username: string) {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .select('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .loadRelationCountAndMap('user.followerCount', 'user.followers')
      .loadRelationCountAndMap('user.followingCount', 'user.following')
      .loadRelationCountAndMap('user.photoCount', 'user.photos')
      .cache(true)
      .getOne()
    if (!user) {
      throw new ApolloError('User not found')
    }
    return user
  }
}
