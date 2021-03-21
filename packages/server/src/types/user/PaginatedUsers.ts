import { ObjectType } from 'type-graphql'
import { User } from '@entity/User'
import PaginatedResponse from '@modules/shared/PaginatedResponse'

@ObjectType()
export class PaginatedUsersSearch extends PaginatedResponse<User, String>(User, String) {}
