import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Photo } from './Photo'

@Entity()
@ObjectType()
export class Likes extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => ID)
  @Column('uuid')
  photoId: string

  @Field()
  @Column('uuid')
  userId: string

  @Field(() => String)
  @Column()
  date: Date

  @ManyToOne(() => Photo, (photo) => photo.likes, {
    onDelete: 'CASCADE'
  })
  photo: Photo

  @ManyToOne(() => User)
  user: User
}
