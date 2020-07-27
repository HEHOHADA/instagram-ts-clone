import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { DeleteCommentType } from './types/DeleteCommentType'
import { Comment } from '../../entity/Comment'

///Todo
@Resolver()
export class DeleteCommentResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteComment(
      @Arg('data'){commentId}: DeleteCommentType,
  ) {

    await Comment.delete(commentId)

    return true
  }
}
