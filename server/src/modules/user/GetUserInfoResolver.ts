import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { ApolloError } from 'apollo-server-express'
import { getConnection } from 'typeorm'
import { MyContext } from '../../types/MyContext'
import { isUserAuthOrUndefined } from '../../middleware/isAuthenticatedMiddleware'

@Resolver(() => User)
export class GetUserInfoResolver {

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isFollowing(@Root() user: User, @Ctx() {payload: {userId}}: MyContext) {
    if (!userId) return false

    // @ts-ignore
    user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', {userId: userId})
        .leftJoinAndSelect(
            'user.following',
            'targetUser',
            'targetUser.id = :targetId',
            {
              targetId: user.id
            }
        )
        .getOne()

    if (!user) return false

    return Boolean((user.following).length)
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isFollowed(@Root() user: User, @Ctx() {payload: {userId}}: MyContext) {
    if (!userId) return false

    // @ts-ignore
    user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', {userId: user.id})
        .leftJoinAndSelect(
            'user.following',
            'targetUser',
            'targetUser.id = :targetId',
            {
              targetId: userId
            }
        )
        .getOne()

    if (!user) return false

    return Boolean((user.following).length)
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isCurrentUser(@Root() user: User, @Ctx() {payload: {userId}}: MyContext) {
    return user.id === userId
  }

  @Query(() => User)
  async getUserInfo(
      @Arg('username')username: string
  ) {
    const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('user.username ILIKE :username', {
          username: username.replace(/_/g, '\\_')
        })
        .loadRelationCountAndMap('user.followerCount', 'user.followers')
        .loadRelationCountAndMap('user.followingCount', 'user.following')
        .loadRelationCountAndMap('user.photoCount','user.photos')
        .cache(true)
        .getOne()
    if (!user) {
      throw new ApolloError('User not found')
    }
    return user
  }
}
