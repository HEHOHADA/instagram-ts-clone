import { gql } from '@apollo/client'


export const feedQuery = gql`
    query Feed{
        feed{
            date
            userId
            id
            pictureUrl
            likeCount
            commentCount
            user{
                pictureUrl
                fullName
                username
            }
            comments{
                date
                photoId
                userId
                user{
                    pictureUrl
                    username
                    id
                    email
                    fullName
                }
                commentText
                id 
            }
        }
    }
`
