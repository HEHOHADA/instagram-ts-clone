import { gql } from '@apollo/client'

export const photoFragment = gql`
    fragment photoItem on Photo{
        date
        userId
        id
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
`
