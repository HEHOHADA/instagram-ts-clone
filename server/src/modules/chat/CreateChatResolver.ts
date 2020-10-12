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
        //         .query(`
        //   select "c"."id"           AS "c_id",
        //        "c"."date"         AS "c_date",
        //        "u"."id"           AS "users_id",
        //        "u"."fullName"     AS "users_fullName",
        //        "u"."email"        AS "users_email",
        //        "u"."username"     AS "users_username",
        //        "u"."pictureUrl"   AS "users_pictureUrl",
        //        "m"."id"           AS "messages_id",
        //        "m"."text"         AS "messages_text",
        //        "m"."chatId"       AS "messages_chatId",
        //        "m"."userId"       AS "messages_userId",
        //        "m"."readTime"     AS "messages_readTime",
        //        "m"."date"         AS "messages_date"
        // from chat c
        //          inner join "userChat" as cu on cu."chatId" = c.id
        //          inner join "user" u on u.id = cu."userId" and u.id = ($1)
        //          left join "message" m on c.id = m."chatId"
        // where exists(
        //               select *
        //               from chat "c2"
        //                        inner join "userChat" as cu2
        //                                   on cu2."chatId" = "c2".id and c.id = c2.id
        //                        inner join "user" u2 on u2.id = cu2."userId"
        //               where u2.id = ($2)
        //           )
        //
        //     `, [userId, meId])
        .getRepository(Chat)
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.users', 'users')
        .where('users.id in (:...ids)', {ids: [userId]})
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
