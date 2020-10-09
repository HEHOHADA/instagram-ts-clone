import { getConnection } from 'typeorm'
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'

import { User } from '@/entity/User'
import { Likes } from '@/entity/Likes'
import { Photo } from '@/entity/Photo'
import { MyContext } from '@/types/MyContext'
import { ApolloError } from 'apollo-server-express'
import { isAuth } from '@/middleware/isAuthMiddleware'
import { processUpload } from '../shared/processUpload'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { somethingWentWrong } from '../user/utils/errorMessages'
import { isUserAuthOrUndefined } from '@/middleware/isAuthenticatedMiddleware'


@Resolver(() => Photo)
export class CreatePhotoResolver {


  @FieldResolver(() => Number, {defaultValue: 0})
  async likeCount(@Root()photo: Photo) {
    return await getConnection()
        .getRepository(Likes)
        .createQueryBuilder('like')
        .where('like.photoId= :id', {id: photo.id})
        .getCount()
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isLiked(@Root()photo: Photo, @Ctx(){payload}: MyContext) {
    const like = await Likes.findOne({photoId: photo.id, userId: payload.userId!})
    return Boolean(like)
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isAuthor(@Root()photo: Photo, @Ctx(){payload}: MyContext) {
    return photo.userId === payload.userId
  }


  @FieldResolver(() => [Comment])
  async comments(@Root()photo: Photo) {
    return await getConnection()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.photoId= :id', {id: photo.id})
        .getMany()
  }

  @FieldResolver(() => Number, {defaultValue: 0})
  async commentCount(@Root()photo: Photo) {
    return await getConnection()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.photoId= :id', {id: photo.id})
        .getCount()
  }

  @FieldResolver(() => User)
  async user(
      @Root()photo: Photo,
      @Ctx(){userLoader}: MyContext
  ) {
    return userLoader.load(photo.userId)
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Photo)
  async createPhoto(
      @Ctx(){payload}: MyContext,
      @Arg('title')title: string,
      @Arg('picture', () => GraphQLUpload) picture: FileUpload
  ) {
    const id = await processUpload(picture)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }
    const user = await User.findOne(payload.userId!)
    const photo = await Photo.create({
      user,
      date: new Date(),
      pictureUrl: id,
      postText: title
    })

    await photo.save()

    return photo
  }
}
