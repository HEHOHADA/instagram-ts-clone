import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { Chat } from '../../entity/Chat'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'
import { getConnection } from 'typeorm'

@Resolver()
export class CreateChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
      @Arg('userId') userId: string,
      @Ctx() ctx: MyContext
  ) {
    const {payload: {userId: meId}} = ctx
    const chat = await Chat.create({date: new Date()}).save()

    const users = await User.find({
      where: [{id: meId}, {id: userId}],
      relations: ['chats']
    })

    users.forEach((user) => {
      user.chats ? user.chats.push(chat) : (user.chats = [chat])
      user.save()
    })

    return chat
  }


  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async findOrCreateChat(
      @Arg('userId') userId: string,
      @Ctx() ctx: MyContext
  ) {
    const {payload: {userId: meId}} = ctx
    const chat = await getConnection()
        .getRepository(Chat)
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.users', 'users')
        .where('users.id in (:...ids)', {ids: [userId, meId]})
        .leftJoinAndSelect('c.messages', 'messages')
        .cache(true)
        .getOne()

    if (chat) {
      return chat
    } else {
      const chat = await Chat.create({date: new Date()}).save()
      const users = await User.find({
        where: [{id: meId}, {id: userId}],
        relations: ['chats']
      })

      users.forEach((user) => {
        user.chats ? user.chats.push(chat) : (user.chats = [chat])
        user.save()
      })

      return chat
    }
  }
}
