import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { Chat } from '../../entity/Chat'
import { MyContext } from '../../types/MyContext'
import { getConnection } from 'typeorm'
import { createChatFn } from './utils/chat'

@Resolver()
export class CreateChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
      @Arg('userId') userId: string,
      @Ctx() ctx: MyContext
  ) {
    const {payload: {userId: meId}} = ctx
    return createChatFn(meId!, userId)
  }

  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async findOrCreateChat(
      @Arg('userId') userId: string,
      @Ctx() ctx: MyContext
  ) {
    const {payload: {userId: meId}} = ctx
    const chat = await getConnection()
        //       .query(`
        // select * from chat c
        //        inner join "userChat" as cu on cu."chatId" = c.id
        //        inner join "user" u on u.id = cu."userId" and u.id = ($1)  and u.id=($2)
        //        left join "message" m on c.id = m."chatId"
        //   `, [userId, meId])
        // console.log('chat',chat)
        .getRepository(Chat)
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.users', 'users')
        .where('users.id =:id', {id: userId})
        .innerJoin(async (qb)=>{
          return qb
              .subQuery()
              .innerJoin('c2.users', 'users')
              .where('users.id = :id',{id:meId})
              .getSql()
        },'c2','c2.id=c.id')
        .leftJoinAndSelect('c.messages', 'messages')
        .cache(true)
        .getOne()
    if (chat) {
      return chat
    } else {
      return createChatFn(meId!, userId)
    }
  }
}
