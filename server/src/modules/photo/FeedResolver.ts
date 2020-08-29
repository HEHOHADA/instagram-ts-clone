import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Photo } from '../../entity/Photo'
import { User } from '../../entity/User'
import { PaginatedPhotos } from './types/PaginatedPhotos'

@Resolver()
export class FeedResolver {
  @Query(() => PaginatedPhotos)
  @UseMiddleware(isAuth)
  async feed(
      @Arg('limit', () => Int) limit: number,
      @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
      @Ctx(){payload: {userId}}: MyContext
  ): Promise<PaginatedPhotos> {
    const realLimit = Math.min(50, limit)

    const realLimitPlusOne = realLimit + 1

    const qbFollow = (await getConnection()
        .getRepository(User)
        .findOne(userId!, {
          relations: ['following']
        }))?.following.map(userItem => userItem.id)

    const qb = getConnection()
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .where('photo.userId in (:...followId)', {followId: [...qbFollow!, userId]})

    if (cursor) {
      console.log('date', cursor)
      qb.where('photo.date < :cursor', {cursor: new Date(cursor)})
    }
    const photos = await qb
        .orderBy('photo.date', 'DESC')
        .limit(realLimitPlusOne)
        .getMany()
    console.log('postss witout slicing ', photos)
    return {
      photos: photos.slice(0, realLimit),
      hasMore: photos.length === realLimitPlusOne
    }
  }
}
