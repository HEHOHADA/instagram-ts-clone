import {
  BaseEntity,
  Column,
  Entity,
  getConnection,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Ctx, Field, ID, ObjectType, Root, UseMiddleware } from 'type-graphql'

import { Chat } from './Chat'
import { Photo } from './Photo'
import { Comment } from './Comment'
import { MyContext } from '@/types/MyContext'
import { isUserAuthOrUndefined } from '@/middleware/isAuthenticatedMiddleware'

@Entity()
@ObjectType({isAbstract: true})
export class User extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('text')
  fullName: string

  @Field()
  @Column('text', {unique: true})
  email: string

  @Field()
  @Column('text', {unique: true})
  username: string

  @Field({nullable: true})
  @Column('varchar', {nullable: true, default: null})
  pictureUrl: string

  @Column()
  password: string

  @Column('bool', {default: false})
  confirmed: boolean

  @Column('bool', {default: false})
  forgotPasswordLocked: boolean

  @Column('text', {default: 0})
  tokenVersion: number

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  @Field({defaultValue: 0})
  followerCount: number

  @Field({defaultValue: 0})
  followingCount: number

  @Field({defaultValue: 0})
  photoCount: number

  @ManyToMany(
      () => User,
      (user) => user.following
  )
  @JoinTable()
  followers: User[]

  @ManyToMany(
      () => User,
      (user) => user.followers
  )
  following: User[]

  @Field(() => Chat)
  @ManyToMany(
      () => Chat,
      (chat) => chat.users)
  chats: Chat[]

  @Field(()=>Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isFollowed(@Root() parent: User, @Ctx() {payload: {userId}}: MyContext) {
    if (!userId) return false

   const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', {userId: parent.id})
        .leftJoinAndSelect(
            'user.following',
            'targetUser',
            'targetUser.id = :targetId',
            {
              targetId: userId
            }
        )
        .getOne()

    if (!user) return false

    return Boolean((user.following).length)
  }

  @Field(()=>Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  async isFollowing(@Root() parent: User, @Ctx() {payload: {userId}}: MyContext) {
    if (!userId) return false

    const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', {userId: userId})
        .leftJoinAndSelect(
            'user.following',
            'targetUser',
            'targetUser.id = :targetId',
            {
              targetId: parent.id
            }
        )
        .getOne()

    if (!user) return false

    return Boolean((user.following).length)
  }

  @Field(()=>Boolean)
  @UseMiddleware(isUserAuthOrUndefined)
  isCurrentUser(@Root() user: User, @Ctx() {payload: {userId}}: MyContext) {
    return user.id === userId
  }

}
