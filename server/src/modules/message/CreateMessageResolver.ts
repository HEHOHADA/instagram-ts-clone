import { Context } from 'vm'
import { Arg, Ctx, FieldResolver, Mutation, PubSub, PubSubEngine, Resolver, Root, UseMiddleware } from 'type-graphql'
import { Message } from '../../entity/Message'
import { isAuth } from '../../middleware/isAuthMiddleware'
import { MyContext } from '../../types/MyContext'
import { User } from '../../entity/User'

@Resolver(() => Message)
export class CreateMessageResolver {

  @FieldResolver()
  @UseMiddleware(isAuth)
  isAuthor(@Root()message: Message, @Ctx(){payload}: MyContext) {
    return message.userId === payload.userId
  }

  @FieldResolver(() => User)
  user(@Root()message: Message, @Ctx(){userLoader}: MyContext) {
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
    const {payload: {userId}} = ctx

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
