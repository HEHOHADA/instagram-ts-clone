import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { ApolloError } from 'apollo-server-express'
import { getConnection } from 'typeorm'
import { Photo } from '../../entity/Photo'

@Resolver()
export class GetUserInfoResolver {
  @Query(() => User)
  async getUserInfo(
      @Arg('userId')userId: string
  ) {
    const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('id = :userId', {userId})
        .loadRelationCountAndMap('user.followerCount', 'user.followers')
        .cache(true)
        .getOne()

    const userPhoto = await Photo.find({where: {userId}, cache: true})
    console.log(user, userPhoto)


    if (!user) {
      throw new ApolloError('User not found')
    }

    return user
  }
}
