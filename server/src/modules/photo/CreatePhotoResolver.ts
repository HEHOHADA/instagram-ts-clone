import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { processUpload } from '../shared/processUpload'
import { ApolloError } from 'apollo-server-express'
import { somethingWentWrong } from '../user/utils/errorMessages'
import { Photo } from '../../entity/Photo'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm'
import { Likes } from '../../entity/Likes'
import { Comment } from '../../entity/Comment'
import { isUserAuthOrUndefined } from '../../middleware/isAuthenticatedMiddleware'

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
    return getConnection()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.photoId= :id', {id: photo.id})
        .getMany()
  }

  @FieldResolver(() => Number, {defaultValue: 0})
  async commentCount(@Root()photo: Photo) {
    return getConnection()
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
    return await Photo.create({
      user,
      date: new Date(),
      pictureUrl: id,
      postText: title
    }).save()
  }
}
