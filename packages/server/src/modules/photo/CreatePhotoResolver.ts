import { Repository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'

import { User } from '@entity/User'
import { Photo } from '@entity/Photo'
import { Likes } from '@entity/Likes'
import { Comment } from '@entity/Comment'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { processUpload } from '@helpers/shared/processUpload'
import { somethingWentWrong } from '@helpers/user/errorMessages'
import { isUserAuthOrUndefined } from '@middleware/isAuthenticatedMiddleware'

@Resolver(() => Photo)
export class CreatePhotoResolver {
  constructor(
    @InjectRepository(Likes) private readonly likesRepository: Repository<Likes>,
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
  ) {}

  @FieldResolver(() => Number, { defaultValue: 0 })
  async likeCount(@Root() photo: Photo) {
    return this.likesRepository
      .createQueryBuilder('like')
      .where('like.photoId= :id', { id: photo.id })
      .getCount()
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isLiked(@Root() photo: Photo, @Ctx() { payload }: MyContext) {
    const like = await this.likesRepository.findOne({ photoId: photo.id, userId: payload.userId! })
    return Boolean(like)
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  isAuthor(@Root() photo: Photo, @Ctx() { payload }: MyContext) {
    return photo.userId === payload.userId
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() photo: Photo) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.photoId= :id', { id: photo.id })
      .getMany()
  }

  @FieldResolver(() => Number, { defaultValue: 0 })
  async commentCount(@Root() photo: Photo) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.photoId= :id', { id: photo.id })
      .getCount()
  }

  @FieldResolver(() => User)
  async user(@Root() photo: Photo, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(photo.userId)
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Photo)
  async createPhoto(
    @Ctx() { payload }: MyContext,
    @Arg('title') title: string,
    @Arg('picture', () => GraphQLUpload) picture: FileUpload
  ) {
    const id = await processUpload(picture)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }
    const user = await this.userRepository.findOne(payload.userId!)
    return await this.photoRepository
      .create({
        user,
        date: new Date(),
        pictureUrl: id,
        postText: title
      })
      .save()
  }
}
