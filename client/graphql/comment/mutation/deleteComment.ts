import { gql } from '@apollo/client'

export const deleteCommentMutation = gql`
    mutation DeleteComment($data:DeleteCommentType!){
        deleteComment(data:$data)
    }
`
