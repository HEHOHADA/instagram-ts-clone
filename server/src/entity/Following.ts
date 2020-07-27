import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'

@Entity()
@ObjectType()
export class Following extends BaseEntity {

  @Field(() => ID)
  @PrimaryColumn('uuid')
  userId: string

  @Field(() => ID)
  @Column('uuid')
  followingId: string

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  date: Date

  @ManyToOne(() => User, user => user.followings)
  following: Following
}
