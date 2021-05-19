import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Ctx, Field, ID, ObjectType, Root, UseMiddleware } from 'type-graphql'

import { MyContext } from '@type/MyContext'
import { isAuth } from '@middleware/isAuthMiddleware'
import { User } from './User'
import { Message } from './Message'

@Entity()
@ObjectType()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column()
  date: Date

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @Field(() => Message, { nullable: true })
  lastMessage(@Root() parent: Chat): Message {
    const lastMessage = parent.messages[parent.messages.length - 1]
    return lastMessage ?? null
  }

  @Field(() => Boolean)
  @UseMiddleware(isAuth)
  unread(@Root() parent: Chat, @Ctx() ctx: MyContext): Boolean {
    const {
      payload: { userId }
    } = ctx
    const lastMessage = parent.messages[parent.messages.length - 1]
    const isUnread = !lastMessage.readTime
    const isSentByMe = userId === lastMessage.userId

    return isUnread && !isSentByMe
  }

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    name: 'userChat',
    joinColumn: {
      name: 'chatId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    }
  })
  users: User[]
}
