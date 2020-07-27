import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Photo } from './Photo'

@Entity()
@ObjectType()
export class Likes extends BaseEntity {

  @Field(() => ID)
  @PrimaryColumn('uuid')
  photoId: string

  @Field(() => ID)
  @Column('uuid')
  likerId: string

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  date: Date

  @ManyToOne(() => Photo,
      photo => photo.likes)
  photo: Photo

  @ManyToOne(() => User)
  user: User
}
