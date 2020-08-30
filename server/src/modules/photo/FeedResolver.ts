import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
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
          relations: ['following'],
          cache: true
        }))?.following.map(userItem => userItem.id)
    //
    // const qb = getConnection()
    //     .getRepository(Photo)
    //     .createQueryBuilder('photo')
    //     .where('photo.userId in (:...followId)', {followId: [...qbFollow!, userId]})

    const replacements: any[] = [[...qbFollow!, userId].join(','), realLimitPlusOne]
    if (cursor) {
      console.log('cursor', cursor)
      replacements.push(new Date(parseInt(cursor)))
    }
    const photosPlusOne = await getConnection().query(`
      select p.* from photo p 
      where p."userId" in ($1)
      ${ cursor ? `and p.date < $3` : '' }
      order by p.date DESC
      limit $2
      `, replacements)
    // if (cursor) {
    //   qb.where('photo.date < :cursor', {cursor: new Date(cursor)})
    // }

    // const photosPlusOne = await qb
    //     .orderBy('photo.date', 'DESC')
    //     .limit(realLimitPlusOne)
    //     .getMany()
    // console.log('postss witout slicing ', photosPlusOne)
    const photos = photosPlusOne.slice(0, realLimit)
    const endCursor = photos[photos.length - 1].date

    return {
      photos,
      feedInfo: {
        hasMore: photos.length === realLimitPlusOne,
        endCursor
      }
    }
  }
}
