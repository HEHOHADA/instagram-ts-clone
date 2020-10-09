import { gql } from '@apollo/client'

export const searchQuery = gql`
    query Search($limit:Int!,$cursor:String,$subString:String!){
        search(limit:$limit,cursor:$cursor,subString:$subString){
            items{
                ...userMe
            }
            paginationInfo{
                hasMore
                endCursor
            }
        }
    }
`
