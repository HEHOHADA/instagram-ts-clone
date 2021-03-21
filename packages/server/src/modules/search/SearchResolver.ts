import { Arg, Int, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { User } from '@entity/User'
import { PaginatedUsersSearch } from './PaginatedUsers'

@Resolver()
export class SearchResolver {
  @Query(() => PaginatedUsersSearch)
  async search(
    @Arg('subString', () => String) subString: string,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedUsersSearch> {
    const realLimit = Math.min(50, limit)

    const realLimitPlusOne = realLimit + 1
    const queryBuilder = getConnection()
      .getRepository(User)
      .createQueryBuilder('u')
      .where('u.username ILIKE  :username', { username: `${subString}%` })
      .orderBy('u.username')
    if (cursor) {
      queryBuilder.andWhere('u.username < :username', { username: cursor })
    }

    const userPlusOne = await queryBuilder.limit(realLimitPlusOne).getMany()

    const users = userPlusOne.slice(0, realLimit)
    const endCursor = users[users.length - 1].username

    return {
      items: users,
      paginationInfo: {
        hasMore: userPlusOne.length === realLimitPlusOne,
        endCursor
      }
    }
  }
}
