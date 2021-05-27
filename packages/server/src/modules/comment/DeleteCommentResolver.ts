import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Comment } from '@entity/Comment'
import { isAuth } from '@middleware/isAuthMiddleware'
import { DeleteCommentType } from '@type/comment/DeleteCommentType'
import { Service } from 'typedi'

/// Todo
@Resolver()
@Service()
export class DeleteCommentResolver {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteComment(@Arg('data') { id }: DeleteCommentType) {
    await this.commentRepository.delete(id)

    return true
  }
}
