import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { Comment } from '../../entity/Comment'
import { CreateCommentType } from './types/CreateCommentType'
import { User } from '../../entity/User'

@Resolver(() => Comment)
export class CreateCommentResolver {


  @FieldResolver(() => User)
  async user(@Root()comment: Comment) {
    return await User.findOne(comment.userId)
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
