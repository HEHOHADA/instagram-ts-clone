import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'

import { User } from '@entity/User'
import { Comment } from '@entity/Comment'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { CreateCommentType } from '@type/comment/CreateCommentType'
import { isUserAuthOrUndefined } from '@middleware/isAuthenticatedMiddleware'
import { Service } from 'typedi'

@Resolver(() => Comment)
@Service()
export class CreateCommentResolver {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  @FieldResolver(() => User)
  async user(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(comment.userId)
  }

  @FieldResolver(() => User)
  @UseMiddleware(isUserAuthOrUndefined)
  isAuthor(@Root() comment: Comment, @Ctx() { payload }: MyContext) {
    return comment.userId === payload.userId
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Comment)
  async createComment(
    @Arg('data', () => CreateCommentType) { photoId, commentText }: CreateCommentType,
    @Ctx() { payload: { userId }, userLoader }: MyContext
  ) {
    const user = await userLoader.load(userId!)

    return await this.commentRepository
      .create({
        commentText,
        date: new Date(),
        photoId,
        user
      })
      .save()
  }
}
