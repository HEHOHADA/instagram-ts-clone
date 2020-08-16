import { gql } from '@apollo/client'

export const FollowUserMutation = gql`
    mutation FollowUser($userId:String!){
        followUser(userId:$userId)
    }
`
