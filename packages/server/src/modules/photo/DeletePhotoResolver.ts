import { Arg, Ctx, Mutation, Resolver, UnauthorizedError, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { Photo } from '../../entity/Photo'
import { isAuth } from '../../middleware/isAuthMiddleware'

@Resolver()
export class CreatePhotoResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePhoto(
      @Ctx(){payload}: MyContext,
      @Arg('id') id: string) {

    const photo = await Photo.findOne(id)

    if (!photo) {
      throw new Error('not found')
    }

    if (payload.userId !== photo.userId) {
      throw new UnauthorizedError()
    }

    await Photo.remove(photo)

    return true
  }
}
