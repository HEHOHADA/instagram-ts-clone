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
  async user(
      @Root()comment: Comment,
      @Ctx(){userLoader}: MyContext
  ) {
    return userLoader.load(comment.userId)
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
      @Ctx(){payload: {userId}, userLoader}: MyContext
  ) {

    const user = await userLoader.load(userId!)

    return await Comment.create({
      commentText,
      photoId,
      user
    }).save()
  }
}
