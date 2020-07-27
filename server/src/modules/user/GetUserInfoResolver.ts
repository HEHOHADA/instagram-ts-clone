import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { ApolloError } from 'apollo-server-express'
import { getConnection } from 'typeorm'

@Resolver()
export class GetUserInfoResolver {
  @Query(() => Boolean)
  async getUserInfo(
      @Arg('userId')userId: string
  ) {
    const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('id = :userId', {userId})
        .leftJoinAndSelect('user.photos','userId','userId = user.id')
        .getOne()
    console.log(user)


    if (!user) {
      throw new ApolloError('User not found')
    }

    return true
  }
}
