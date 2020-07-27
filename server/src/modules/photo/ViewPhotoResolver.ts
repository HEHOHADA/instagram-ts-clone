import { Arg, Ctx, Query, Resolver, UnauthorizedError } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { Photo } from '../../entity/Photo'
import { GetFollowType } from '../follow/types/GetFollowType'

@Resolver()
export class ViewPhotoResolver {
  @Query(() => [Photo])
  async viewUserPhoto(
      @Ctx(){payload}: MyContext,
      @Arg('userId', {nullable: true})userId?: GetFollowType
  ) {
    if (userId || payload.userId) {
      throw new UnauthorizedError()
    }

    return Photo
        .find({where: {userId: userId ?? payload.userId}})
  }
}
