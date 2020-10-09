import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Photo } from '../../entity/Photo'
import { User } from '../../entity/User'
import { Likes } from '../../entity/Likes'
import { ApolloError } from 'apollo-server-express'

@Resolver()
export class LikeResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async like(@Arg('photoId') photoId: string,
             @Ctx() {payload}: MyContext) {
    const photo = await Photo.findOne(photoId)

    if (!photo) {
      throw new Error('Photo not found')
    }

    const user = await User.findOne(payload.userId!)

    const existingLike = await Likes.findOne({where: {userId: payload.userId!, photoId}})

    try {
      if (existingLike) {
        await Likes.remove(existingLike)
      } else {
        await Likes.create({user, date: new Date(), photo}).save()
      }
    } catch {
      throw new ApolloError('Something went wrong')
    }

    return true
  }
}
