import { Ctx, ForbiddenError, Resolver, Root, Subscription } from 'type-graphql'

import { Chat } from '@/entity/Chat'
import { Message } from '@/entity/Message'
import { MyContext } from '@/types/MyContext'


interface Payload {
  messageReceived: Message
}

@Resolver()
export class MessageReceivedResolver {
  @Subscription(() => Message, {
    topics: 'sendMessage',
  })
  async messageReceived(
      @Root() {messageReceived}: Payload,
      @Ctx() ctx: MyContext
  ) {

    const {userId} = ctx.connection!.context

    const chat = await Chat.findOneOrFail({
      where: {id: messageReceived.chatId},
      relations: ['users']
    })

    const usersIds = chat.users.map((user) => user.id)

    const isChatMember = usersIds.includes(userId!)
    return isChatMember
        ? messageReceived
        : new ForbiddenError()
  }
}
