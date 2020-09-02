import { Context } from 'vm'
import { Arg, Ctx, FieldResolver, Mutation, PubSub, PubSubEngine, Resolver, Root, UseMiddleware } from 'type-graphql'
import { Message } from '../../entity/Message'
import { CreateMessageInput } from './type/CreateMessageType'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'

@Resolver(() => Message)
export class CreateMessageResolver {

  @FieldResolver()
  @UseMiddleware(isAuth)
  isAuthor(@Root()message: Message, @Ctx(){payload}: MyContext) {
    return message.userId === payload.userId
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async createMessage(
      @Arg('text') {text}: CreateMessageInput,
      @Arg('chatId') chatId: string,
      @Ctx() ctx: Context,
      @PubSub() pubSub: PubSubEngine
  ) {
    const {userId} = ctx.req

    const message = await Message.create({
      text,
      chatId,
      userId,
      date: new Date()
    }).save()

    pubSub.publish('sendMessage', {messageReceived: message})

    return message
  }
}
