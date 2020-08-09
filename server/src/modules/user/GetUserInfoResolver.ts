import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { ApolloError } from 'apollo-server-express'
import { getConnection } from 'typeorm'

@Resolver()
export class GetUserInfoResolver {
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
        .loadRelationCountAndMap('user.photoCount', 'user.photos')
        .cache(true)
        .getOne()

    if (!user) {
      throw new ApolloError('User not found')
    }
    // const userPhoto = await Photo.find({where: {userId: user.id}, cache: true})

    // console.log(user, userPhoto)

    return user
  }
}
