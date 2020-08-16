import { BaseEntity, CreateDateColumn, Entity, ManyToOne } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Photo } from './Photo'
import { Column, PrimaryGeneratedColumn } from 'typeorm/index'

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

  @Field(() => Date)
  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  date: Date

  @ManyToOne(() => Photo,
      photo => photo.likes)
  photo: Photo

  @ManyToOne(() => User)
  user: User
}
