import { Repository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Likes } from '@entity/Likes'
import { User } from '@entity/User'
import { Photo } from '@entity/Photo'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { Service } from 'typedi'

@Resolver()
@Service()
export class LikeResolver {
  constructor(
    @InjectRepository(Likes) private readonly likesRepository: Repository<Likes>,
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async like(@Arg('photoId') photoId: string, @Ctx() { payload }: MyContext) {
    const photo = await this.photoRepository.findOne(photoId)

    if (!photo) {
      throw new Error('Photo not found')
    }

    const user = await this.userRepository.findOne(payload.userId!)

    const existingLike = await this.likesRepository.findOne({
      where: {
        userId: payload.userId!,
        photoId
      }
    })

    try {
      if (existingLike) {
        await this.likesRepository.remove(existingLike)
      } else {
        await this.likesRepository.create({ user, date: new Date(), photo }).save()
      }
    } catch {
      throw new ApolloError('Something went wrong')
    }

    return true
  }
}
