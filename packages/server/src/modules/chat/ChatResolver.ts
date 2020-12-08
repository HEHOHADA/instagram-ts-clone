import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Chat } from '../../entity/Chat'
import { MyContext } from '../../types/MyContext'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { User } from '../../entity/User'
import { getConnection } from 'typeorm'

@Resolver(() => Chat)
export class ChatResolver {

  @Query(() => Chat)
  @UseMiddleware(isAuth)
  async chat(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const {payload: {userId}} = ctx
    // const chat = await Chat.findOneOrFail({
    //   where: {id},
    //   relations: ['users', 'messages'],
    //
    // })
    const chat = await getConnection()
        .getRepository(Chat)
        .createQueryBuilder('c')
        .where('c.id = :id', {id})
        .leftJoinAndSelect('c.users', 'users')
        .leftJoinAndSelect('c.messages', 'messages')
        .orderBy('messages.date', 'ASC')
        .getOne()
    if (!chat) {
      throw new Error('Chat not found')
    }
    // mark as read all messages received by the authenticated user
    chat.messages = chat.messages.map((message) => {
      const isMeReceiver = message.userId !== userId
      const isUnread = !message.readTime

      if (isUnread && isMeReceiver) {
        message.readTime = new Date()
        message.save()
      }

      return message
    })

    // get rid of me (user) from the users array
    // to not have to filter out me on the client side
    chat.users = chat.users.filter((user) => user.id !== userId)

    return chat
  }

  @Query(() => [Chat])
  @UseMiddleware(isAuth)
  async chats(@Ctx() ctx: MyContext) {
    const {payload: {userId}} = ctx
    const {chats} = await User.findOneOrFail({
      where: {id: userId},
      relations: ['chats', 'chats.users', 'chats.messages']
    })

    const nonEmptyChats = chats.filter((chat) => chat.messages.length > 0)
    const previewChats = nonEmptyChats.map((chat) => {
      // get rid of me (user) from the users array
      // to not have to filter out me on the client side
      chat.users = chat.users.filter((user) => user.id !== userId)

      return chat
    })
    // sort by sent time of the last message (latest message' chat first in the array)
    previewChats.sort((chatA, chatB) => {
      const lastMessageOfChatA = chatA.messages[chatA.messages.length - 1]
      const lastMessageOfChatB = chatB.messages[chatB.messages.length - 1]

      return (
          // .getTime() because otherwise typescript throws an error (it would work in js without it)
          lastMessageOfChatB.date.getTime() -
          lastMessageOfChatA.date.getTime()
      )
    })
    return previewChats
  }

}
