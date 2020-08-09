import { Arg, Query, Resolver, UnauthorizedError } from 'type-graphql'
import { Photo } from '../../entity/Photo'
import { getConnection } from 'typeorm/index'
import { User } from '../../entity/User'

@Resolver()
export class ViewPhotoResolver {
  @Query(() => [Photo])
  async viewUserPhoto(
      @Arg('username')username: string
  ) {
    if (!username) {
      throw new UnauthorizedError()
    }

    const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('user.username ILIKE :username', {
          username: username.replace(/_/g, '\\_')
        })
        .getOne()

    if (!user) {
      throw new UnauthorizedError()
    }

    return Photo
        .find({where: {userId: user.id}})
  }
}
