import { gql } from '@apollo/client'

export const refreshTokenMutation = gql`
    query RefreshToken{
        refreshToken{
            accessToken
        }
    }
`
