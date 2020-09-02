import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { Chat } from '../../entity/Chat'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'

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

    console.log('userId: ', userId)
    console.log('creatorId:', meId)
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
