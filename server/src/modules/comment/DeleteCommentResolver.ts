import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Comment } from '@/entity/Comment'
import { isAuth } from '@/middleware/isAuthMiddleware'
import { DeleteCommentType } from './types/DeleteCommentType'

///Todo
@Resolver()
export class DeleteCommentResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteComment(
      @Arg('data'){id}: DeleteCommentType,
  ) {

    await Comment.delete(id)

    return true
  }
}
