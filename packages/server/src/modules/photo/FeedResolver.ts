import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { User } from '../../entity/User'
import { PaginatedPhotos } from './types/PaginatedPhotos'
import { Photo } from '../../entity/Photo'

@Resolver()
export class FeedResolver {
  @Query(() => PaginatedPhotos)
  @UseMiddleware(isAuth)
  async feed(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { payload: { userId } }: MyContext
  ): Promise<PaginatedPhotos> {
    const realLimit = Math.min(50, limit)

    const realLimitPlusOne = realLimit + 1

    const qbFollow = (
      await getConnection()
        .getRepository(User)
        .findOne(userId!, {
          relations: ['following'],
          cache: true
        })
    )?.following.map((userItem) => userItem.id)

    // const replacements: any[] = [[...qbFollow!, userId].join(','), realLimitPlusOne]
    //
    // if (cursor) {
    //
    //   replacements.push(new Date(parseInt(cursor)))
    // }

    const queryBuilder = getConnection()
      .getRepository(Photo)
      .createQueryBuilder('p')
      .where('p.userId in (:...ids)', { ids: [...qbFollow!, userId] })

    if (cursor) {
      queryBuilder.andWhere('p.date < :date', { date: new Date(parseInt(cursor)) })
    }
    const photosPlusOne = await queryBuilder
      .orderBy('p.date', 'DESC')
      .limit(realLimitPlusOne)
      .cache(true)
      .getMany()
    // const photosPlusOne = await getConnection().query(`
    //   select p.* from photo p
    //   where p."userId" IN ($1)
    //   ${ cursor ? `and p.date < $3` : '' }
    //   order by p.date DESC
    //   limit $2
    //   `, replacements)

    const items = photosPlusOne.slice(0, realLimit)
    const endCursor = items[items.length - 1].date

    return {
      items,
      paginationInfo: {
        hasMore: photosPlusOne.length === realLimitPlusOne,
        endCursor
      }
    }
  }
}
