import { gql } from "@apollo/client";

export const meQuery = gql`
    query Me{
        me{
            email
            id
            username
            pictureUrl
            fullName
        }
    }
`
