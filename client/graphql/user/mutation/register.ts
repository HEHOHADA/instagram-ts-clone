import { gql } from '@apollo/client'

export const registerMutation = gql`
    mutation Register($data:RegisterInput!){
        register(data:$data){
            id
            email
            username
        }
    }
`
