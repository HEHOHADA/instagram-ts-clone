import { ObjectType } from 'type-graphql'
import PaginatedResponse from '../../shared/PaginatedResponse'
import { Photo } from '../../../entity/Photo'

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
