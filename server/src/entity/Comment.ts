import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Photo } from './Photo'


@Entity()
@ObjectType()
export class Comment extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => ID)
  @Column('uuid')
  photoId: string

  @Field(() => String)
  @Column('text')
  commentText: string

  @Field()
  @Column('uuid')
  userId: string

  @Field()
  isAuthor: boolean

  @Field()
  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  date: Date

  @Field(() => User)
  @ManyToOne(() => User,
      user => user.photos)
  user: User

  @Field(() => Photo)
  @ManyToOne(() => Photo,
      photo => photo.comments, {
        onDelete: 'CASCADE',
      })
  photo: Photo
}
