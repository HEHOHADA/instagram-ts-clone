import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Photo } from '../../entity/Photo'
import { User } from '../../entity/User'

@Resolver()
export class FeedResolver {
  @Query(() => [Photo], {nullable: true})
  @UseMiddleware(isAuth)
  async feed(@Ctx(){payload: {userId}}: MyContext) {
    const qbFollow = (await getConnection()
        .getRepository(User)
        .findOne(userId!, {
          relations: ['following']
        }))?.following.map(userItem => userItem.id)

    return await getConnection()
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .where('photo.userId in (:...followId)', {followId: [...qbFollow!, userId]})
        .orderBy('photo.date', 'DESC')
        .innerJoinAndMapOne('photo.user', 'photo.user', 'user')
        .cache(true)
        .leftJoinAndMapMany('photo.comments', 'photo.comments', 'comments')
        .getMany()
  }
}
