import { gql } from '@apollo/client'

export const confirmUserMutation = gql`    
    mutation ConfirmUser($token:String!){
        confirmUser(token:$token)
    }
`
