import { getConnection } from 'typeorm'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Chat } from '@entity/Chat'
import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { Service } from 'typedi'
import { createChatFn } from './utils/chat'

@Resolver()
@Service()
export class CreateChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(@Arg('userId') userId: string, @Ctx() ctx: MyContext) {
    const {
      payload: { userId: meId }
    } = ctx
    return createChatFn(meId!, userId)
  }

  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async findOrCreateChat(@Arg('userId') userId: string, @Ctx() ctx: MyContext) {
    const {
      payload: { userId: meId }
    } = ctx
    const chat = await getConnection()
      .getRepository(Chat)
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.users', 'users')
      .where('users.id = :id', { id: userId })
      .innerJoin(
        (query) =>
          query
            .select('c2')
            .from(Chat, 'c2')
            .innerJoinAndSelect('c2.users', 'users')
            .where('users.id = :id', { id: meId }),
        'c2',
        '"c2"."c2_id" = c.id'
      )
      .leftJoinAndSelect('c.messages', 'messages')
      .cache(true)
      .getOne()
    if (chat) {
      return chat
    }
    return createChatFn(meId!, userId)
  }
}
