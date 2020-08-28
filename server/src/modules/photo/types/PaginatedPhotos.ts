import { ObjectType, Field } from "type-graphql"
import { Photo } from '../../../entity/Photo'

@ObjectType()
export class PaginatedPhotos {
  @Field(() => [Photo])
  photos: Photo[]

  @Field()
  hasMore: boolean
}
