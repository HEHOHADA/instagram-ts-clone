import { ObjectType } from 'type-graphql'

import { Photo } from '@/entity/Photo'
import PaginatedResponse from '@/modules/shared/PaginatedResponse'


@ObjectType()
export class PaginatedPhotos extends PaginatedResponse<Photo, Date>(Photo, Date) {

}
