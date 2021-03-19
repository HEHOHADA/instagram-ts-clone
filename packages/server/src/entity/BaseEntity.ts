import { Field, ID, InterfaceType } from 'type-graphql'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  createdAt: Date = new Date()
}
