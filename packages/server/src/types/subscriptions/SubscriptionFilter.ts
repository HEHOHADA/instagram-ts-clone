import { ResolverFilterData } from 'type-graphql'
import { MyContext } from '@type/MyContext'

export type SubscriptionFilter<T> = ResolverFilterData<T, any, MyContext>
