import { Context } from 'vm'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { Message } from '@entity/Message'
import { isAuth } from '@middleware/isAuthMiddleware'
import { MyContext } from '@type/MyContext'
import { User } from '@entity/User'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver(() => Message)
export class CreateMessageResolver {
  constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>) {}

  @FieldResolver()
  @UseMiddleware(isAuth)
  isAuthor(@Root() message: Message, @Ctx() { payload }: MyContext) {
    return message.userId === payload.userId
  }

  @FieldResolver(() => User)
  user(@Root() message: Message, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(message.userId)
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg('text') text: string,
    @Arg('chatId') chatId: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const {
      payload: { userId }
    } = ctx

    const message = await this.messageRepository
      .create({
        text,
        chatId,
        userId,
        date: new Date()
      })
      .save()

    pubSub.publish('sendMessage', { messageReceived: message })

    return message
  }
}
