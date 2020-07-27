import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'

@Entity()
@ObjectType()
export class Follower extends BaseEntity {


  @Field(() => ID)
  @PrimaryColumn('uuid')
  userId: string

  @Field(() => ID)
  @Column('uuid')
  followerId: string

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  date: Date

  @ManyToOne(() => User, user => user.followers)
  follower: Follower
}
