import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { processUpload } from '../shared/processUpload'
import { ApolloError } from 'apollo-server-express'
import { somethingWentWrong } from '../user/utils/errorMessages'
import { Photo } from '../../entity/Photo'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm/index'
import { Likes } from '../../entity/Likes'
import { Comment } from '../../entity/Comment'

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
      pictureUrl: id,
      postText: title
    })

    await photo.save()

    return photo
  }
}
