import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { User } from '../../entity/User'
import { Photo } from '../../entity/Photo'

@Resolver()
export class FeedResolver {
  @Query(() => [Photo], {nullable: true})
  @UseMiddleware(isAuth)
  async feed(@Ctx()ctx: MyContext) {
    const qb = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', {userId: ctx.payload.userId})
        .loadRelationIdAndMap('user.followIds', 'user.followers')
        .getOne() as any
    console.log(qb?.followIds!)
    const posts = await getConnection()
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .where('photo.userId in (:...followId)', {followId: qb.followIds})
        .orderBy('photo.date', 'ASC')
        .leftJoin('photo.comments', 'comments','photo.photoId=comments.photoId')
        .getMany()

    console.log(qb?.followIds!, posts)
    return posts
  }
}
