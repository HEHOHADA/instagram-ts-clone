import { gql } from '@apollo/client'

export const createCommentMutation = gql`
    mutation CreateComment($data:CreateCommentType!){
        createComment(data:$data){
            date
            userId
            id
            commentText
            photoId
            user{
                username
                id
                email
                pictureUrl
                fullName
            }
        }
    }
`
