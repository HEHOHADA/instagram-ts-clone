import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Photo } from './Photo'
import { Comment } from './Comment'

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

  @OneToMany(() => Photo, photo => photo.userId)
  photos: Photo[]

  @OneToMany(() => Comment, comment => comment.userId)
  comments: Comment[]

  @Field()
  followerCount: number

  @Field()
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
  @JoinTable()
  following: User[]

}
