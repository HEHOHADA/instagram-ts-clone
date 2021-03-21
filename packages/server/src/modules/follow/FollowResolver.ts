import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Repository } from 'typeorm'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { User } from '@entity/User'
import { isUserAuthOrUndefined } from '@middleware/isAuthenticatedMiddleware'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Resolver()
export class FollowResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @UseMiddleware(isUserAuthOrUndefined)
  @Query(() => [User])
  async getFollowers(@Arg('userId') userId: string) {
    return (
      await this.userRepository
        .findOne(userId, {
          relations: ['followers']
        })
    )?.followers
  }

  @UseMiddleware(isUserAuthOrUndefined)
  @Query(() => [User])
  async getFollowings(@Arg('userId') userId: string) {
    return (
      await this.userRepository
        .findOne(userId, {
          relations: ['following']
        })
    )?.following
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async followUser(@Ctx() { payload }: MyContext, @Arg('userId') userId: string) {
    if (payload.userId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'following')
      .of(payload.userId)
      .add(userId)

    return true
  }
}
