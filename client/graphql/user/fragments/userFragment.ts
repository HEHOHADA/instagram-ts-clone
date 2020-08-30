import { gql } from '@apollo/client'

export const userMeFragment = gql`
    fragment userMe on User{
        email
        id
        username
        pictureUrl
        fullName
    }
`
