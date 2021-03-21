import { ObjectType } from 'type-graphql'
import { User } from '@entity/User'
import PaginatedResponse from '@helpers/pagination/PaginatedResponse'

@ObjectType()
export class PaginatedUsersSearch extends PaginatedResponse<User, String>(User, String) {}
