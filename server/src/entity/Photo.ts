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
  photoId: string

  @Field()
  @Column('varchar')
  pictureUrl: string

  @Field()
  @Column('uuid')
  userId: string

  @ManyToOne(() => User,
      user => user.photos)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  user: User

  @OneToMany(() => Likes,
      like => like.photoId)
  likes: Likes[]

  @OneToMany(() => Comment,
      comment => comment.photoId)
  comments: Comment[]
}
