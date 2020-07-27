import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Photo } from './Photo'
import { Comment } from './Comment'
import { Follower } from './Follower'
import { Following } from './Following'

@Entity()
@ObjectType({isAbstract: true})
export class User extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  // @Field()
  // @Column('text', {nullable: true})
  // firstName: string
  //
  // @Field()
  // @Column('text', {nullable: true})
  // lastName: string
  @Field()
  @Column('text')
  fullName: string

  @Field()
  @Column('text', {unique: true})
  email: string

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

  @OneToMany(() => Follower, follower => follower.userId)
  followers: Follower[]

  @OneToMany(() => Following, following => following.userId)
  followings: Following[]
}
