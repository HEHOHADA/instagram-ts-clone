import { gql } from '@apollo/client'

export const photoFragment = gql`
    fragment photFragment on Photo {
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
`
