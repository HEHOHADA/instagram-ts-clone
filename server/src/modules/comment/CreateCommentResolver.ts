import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'

import { User } from '@/entity/User'
import { Comment } from '@/entity/Comment'
import { MyContext } from '@/types/MyContext'
import { isAuth } from '@/middleware/isAuthMiddleware'
import { CreateCommentType } from './types/CreateCommentType'
import { isUserAuthOrUndefined } from '@/middleware/isAuthenticatedMiddleware'


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
      date: new Date(),
      photoId,
      user
    }).save()
  }
}
