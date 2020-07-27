import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Photo } from './Photo'


@Entity()
@ObjectType()
export class Comment extends BaseEntity {

  @Field(() => ID)
  @PrimaryColumn('uuid')
  photoId: string

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  commentId: string

  @Field(() => String)
  @Column('text')
  comment: string

  @Field()
  @Column('uuid')
  userId: string

  @Field()
  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  date: Date

  @ManyToOne(() => User,
      user => user.photos)
  user: User

  @ManyToOne(() => Photo,
      photo => photo.comments)
  photo: Photo
}
