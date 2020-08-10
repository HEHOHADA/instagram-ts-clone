import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Comment } from './Comment'
import { Likes } from './Likes'


@Entity()
@ObjectType()
export class Photo extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  photoId: string

  @Field()
  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  date: Date

  @Field()
  @Column('varchar')
  pictureUrl: string

  @Field()
  @Column('uuid')
  userId: string

  @Field(() => User)
  @ManyToOne(() => User,
      user => user.photos)
  @JoinColumn()
  user: User

  @OneToMany(() => Likes,
      like => like.photoId)
  likes: Likes[]

  @OneToMany(() => Comment,
      comment => comment.photoId)
  comments: Comment[]
}
