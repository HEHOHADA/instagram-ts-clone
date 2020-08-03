import { gql } from '@apollo/client'

export const changeForgotPasswordMutation = gql`
    mutation ChangeForgotPassword($data:ChangeForgotPassword!){
        changeForgotPassword(data:$data){
            id
            username
        }
    }
`
