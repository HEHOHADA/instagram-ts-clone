import { Field, ObjectType } from 'type-graphql'
import { Photo } from '../../../entity/Photo'


@ObjectType()
class FeedInfo {
  @Field()
  hasMore: boolean
  @Field()
  endCursor: Date
}

@ObjectType()
export class PaginatedPhotos {
  @Field(() => [Photo])
  photos: Photo[]

  @Field(() => FeedInfo)
  feedInfo: FeedInfo
}
