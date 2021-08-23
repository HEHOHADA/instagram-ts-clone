import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { Photo } from '@entity/Photo'
import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { Service } from 'typedi'

@Resolver(() => Photo)
@Service()
export class ViewPhotoResolver {
  constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @FieldResolver(() => String, { nullable: true })
  pictureUrl(@Root() photo: Photo, @Ctx() ctx: MyContext) {
    if (photo.pictureUrl.includes('http')) {
      return photo.pictureUrl
    }
    return `${ctx.url}/images/${photo.pictureUrl}`
  }

  @Query(() => [Photo])
  async viewUserPhoto(@Arg('username') username: string) {
    if (!username) {
      throw new Error('User not found')
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .getOne()

    if (!user) {
      throw new Error('User not found')
    }

    return this.photoRepository
      .createQueryBuilder('photo')
      .select('photo')
      .orderBy('photo.date', 'DESC')
      .where('photo.userId= :userId', { userId: user.id })
      .cache(true)
      .getMany()
  }

  @Query(() => Photo)
  async viewPhotoById(@Arg('id') id: string) {
    return this.photoRepository.findOne(id)
  }
}
