// import { BaseEntity, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm'
// import { Field, ID, ObjectType } from 'type-graphql'
// import { User } from './User'
//
// @Entity()
// @ObjectType()
// export class Follow extends BaseEntity {
//   @Field(() => ID)
//   @PrimaryColumn('uuid')
//   followId: string
//
//   @Field()
//   @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
//   date: Date
//
//   @ManyToMany(() => User, user => user.follows, {
//     cascade: true,
//     onDelete: 'CASCADE'
//   })
//   users: User[]
// }
