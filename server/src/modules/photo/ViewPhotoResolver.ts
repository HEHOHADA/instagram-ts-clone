import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { Photo } from '../../entity/Photo'
import { getConnection } from 'typeorm/index'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'

@Resolver(()=>Photo)
export class ViewPhotoResolver {

  @FieldResolver(() => String, {nullable: true})
  pictureUrl(@Root()photo: Photo, @Ctx()ctx: MyContext) {

    if (photo.pictureUrl.includes('http')) {
      return photo.pictureUrl
    }
    return `${ ctx.url }/images/${ photo.pictureUrl }`
  }

  @Query(() => [Photo])
  async viewUserPhoto(
      @Arg('username')username: string
  ) {
    if (!username) {
      throw new Error('User not found')
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
      throw new Error('User not found')
    }

    return getConnection()
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .select('photo')
        .where('photo.userId= :userId', {userId: user.id})
        .cache(true)
        .getMany()
  }
}
