import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Ctx, ForbiddenError, Resolver, Root, Subscription } from 'type-graphql'
import { Message } from '@entity/Message'
import { Chat } from '@entity/Chat'
import { MyContext } from '@type/MyContext'

interface Payload {
  messageReceived: Message
}

@Resolver()
export class MessageReceivedResolver {
  constructor(@InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) {}

  @Subscription(() => Message, {
    topics: 'sendMessage'
  })
  async messageReceived(@Root() { messageReceived }: Payload, @Ctx() ctx: MyContext) {
    const { userId } = ctx.connection!.context

    const chat = await this.chatRepository.findOneOrFail({
      where: { id: messageReceived.chatId },
      relations: ['users']
    })

    const usersIds = chat.users.map((user) => user.id)

    const isChatMember = usersIds.includes(userId!)
    return isChatMember ? messageReceived : new ForbiddenError()
  }
}
