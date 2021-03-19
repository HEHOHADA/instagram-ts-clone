import { QueryHookOptions, useQuery } from '@apollo/client'
import {
  FeedDocument,
  IFeedQuery,
  IFeedQueryVariables
} from '@instagram/common'

export function useFeedQuery(baseOptions: QueryHookOptions<IFeedQuery, IFeedQueryVariables>) {
  return useQuery<IFeedQuery, IFeedQueryVariables>(FeedDocument, baseOptions)
}
