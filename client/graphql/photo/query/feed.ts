import { gql } from '@apollo/client'

export const feedQuery = gql`
    query Feed($limit:Int!,$cursor:String){
        feed(limit:$limit,cursor:$cursor){
            items{
                isLiked
                isAuthor
                postText
                ...photoItem
            }
            paginationInfo{
                hasMore
                endCursor
            }
        }
    }
`
