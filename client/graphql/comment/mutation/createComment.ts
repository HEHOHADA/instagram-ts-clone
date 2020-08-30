import { gql } from '@apollo/client'

export const createCommentMutation = gql`
    mutation CreateComment($data:CreateCommentType!){
        createComment(data:$data){
            ...commentItem
            user{
                ...userMe
            }
        }
    }
`
