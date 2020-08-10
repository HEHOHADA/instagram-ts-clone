import { gql } from '@apollo/client'

export const forgotPasswordMutation = gql`
    mutation ForgotPassword($email:ForgotPasswordType!){
        forgotPassword(email:$email)
    }
`
