import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Comment } from './Comment'
import { Likes } from './Likes'


@Entity()
@ObjectType()
export class Photo extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column()
  date: Date

  @Field()
  @Column('varchar')
  pictureUrl: string

  @Field()
  @Column('varchar', {nullable: true})
  postText: string

  @Field()
  @Column('uuid')
  userId: string

  @Field(() => User)
  @ManyToOne(() => User,
      user => user.photos)
  @JoinColumn()
  user: User

  @OneToMany(() => Likes,
      like => like.photo, {
        cascade: true
      })
  likes: Likes[]

  @Field({defaultValue: 0})
  likeCount: number

  @Field({defaultValue: 0})
  commentCount: number

  @Field()
  isLiked: boolean

  @Field()
  isAuthor: boolean

  @Field(() => [Comment], {nullable: true})
  @OneToMany(() => Comment,
      comment => comment.photo, {
        cascade: true
      })
  comments: Comment[]
}
