import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'

import { User } from './User'
import { Chat } from './Chat'


@Entity()
@ObjectType()
export class Message extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column('text')
  text: string

  @Field()
  isAuthor: boolean

  @Field()
  @Column()
  chatId: string

  @Column()
  userId: string

  @Field({nullable: true})
  @Column('timestamp', {default: null})
  readTime: Date

  @Field(() => String)
  @Column()
  date: Date

  @Field(() => Chat)
  @ManyToOne(() => Chat,
      chat => chat.messages)
  chat: Chat

  @Field(() => User)
  @ManyToOne(() => User,
      user => user)
  @JoinColumn()
  user: User
}
