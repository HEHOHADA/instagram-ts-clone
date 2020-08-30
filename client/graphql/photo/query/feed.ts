import { gql } from '@apollo/client'

export const feedQuery = gql`
    query Feed($limit:Int!,$cursor:String){
        feed(limit:$limit,cursor:$cursor){
            photos{
                isLiked
                isAuthor
                postText
                ...photoItem
            }
            feedInfo{
                hasMore
                endCursor
            }
        }
    }
`
