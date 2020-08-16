import { gql } from '@apollo/client'

export const UnFollowUserMutation = gql`
    mutation UnFollowUser($userId:String!){
        unFollowUser(userId:$userId)
    }
`
