import { ObjectType } from 'type-graphql'
import { Photo } from '@entity/Photo'
import PaginatedResponse from '@helpers/pagination/PaginatedResponse'

//
// @ObjectType({isAbstract: true})
// export class PaginationInfo<T> {
//   @Field()
//   hasMore: boolean
//   @Field()
//   endCursor: T
// }

@ObjectType()
export class PaginatedPhotos extends PaginatedResponse<Photo, Date>(Photo, Date) {}
