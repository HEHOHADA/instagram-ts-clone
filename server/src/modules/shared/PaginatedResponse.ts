import { GraphQLScalarType } from 'graphql'
import { ClassType, Field, ObjectType } from 'type-graphql'

export default function PaginatedResponse<TItem, TCursor>(TItemClass: ClassType<TItem>, ICursorItem: ClassType<TCursor> | GraphQLScalarType | String | Number | Boolean) {

  @ObjectType(`Paginated${ TItemClass.name }Response`)
  class PaginationInfo {
    @Field()
    hasMore: boolean

    @Field(() => ICursorItem)
    endCursor: TCursor
  }

  @ObjectType({isAbstract: true})
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[]

    @Field(() => PaginationInfo)
    paginationInfo: PaginationInfo
  }

  return PaginatedResponseClass
}
