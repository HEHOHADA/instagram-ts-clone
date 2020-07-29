import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Comment } from '../../entity/Comment'
import { CreateCommentType } from './types/CreateCommentType'

@Resolver()
export class CreateCommentResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Comment)
  async createComment(
      @Arg('data'){photoId, commentText}: CreateCommentType,
      @Ctx()ctx: MyContext
  ) {
    return await Comment.create({
      commentText,
      photoId,
      userId: ctx.payload.userId
    }).save()
  }
}
