import { Arg, Ctx, Mutation, Resolver, UnauthorizedError, UseMiddleware } from 'type-graphql'
import { MyContext } from '@type/MyContext'
import { Photo } from '@entity/Photo'
import { isAuth } from '@middleware/isAuthMiddleware'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class CreatePhotoResolver {
  constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
  ) {}

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePhoto(@Ctx() { payload }: MyContext, @Arg('id') id: string) {
    const photo = await this.photoRepository.findOne(id)

    if (!photo) {
      throw new Error('not found')
    }

    if (payload.userId !== photo.userId) {
      throw new UnauthorizedError()
    }

    await this.photoRepository.remove(photo)

    return true
  }
}
