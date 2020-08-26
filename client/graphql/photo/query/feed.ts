import { gql } from '@apollo/client'

export const feedQuery = gql`
    query Feed{
        feed{
            date
            userId
            id
            postText
            isLiked
            isAuthor
            pictureUrl
            likeCount
            commentCount
            user{
                ...userMe
            }
            comments{
                ...commentItem
                user{
                    ...userMe
                }
               
            }
        }
    }
`
