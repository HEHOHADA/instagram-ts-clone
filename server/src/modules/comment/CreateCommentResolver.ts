import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Comment } from '../../entity/Comment'
import { CreateCommentType } from './types/CreateCommentType'
import { User } from '../../entity/User'
import { isUserAuthOrUndefined } from '../../middleware/isAuthenticatedMiddleware'

@Resolver(() => Comment)
export class CreateCommentResolver {
  @FieldResolver(() => User)
  async user(@Root()comment: Comment) {
    return await User.findOne(comment.userId)
  }

  @FieldResolver(() => User)
  @UseMiddleware(isUserAuthOrUndefined)
  isAuthor(@Root()comment: Comment, @Ctx(){payload}: MyContext) {
    return comment.userId === payload.userId
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Comment)
  async createComment(
      @Arg('data'){photoId, commentText}: CreateCommentType,
      @Ctx(){payload: {userId}}: MyContext
  ) {

    const user = await User.findOne(userId!)

    return await Comment.create({
      commentText,
      photoId,
      user
    }).save()
  }
}
