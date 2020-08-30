import { gql } from '@apollo/client'

export const commentFragment = gql`
    fragment commentItem on Comment{
        date
        userId
        id
        isAuthor
        commentText
        photoId
    }
`
