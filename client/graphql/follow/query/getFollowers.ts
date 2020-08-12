import { gql } from '@apollo/client'

export const getFollowersQuery = gql`
   query GetFollowers($userId:String!){
        getFollowers(userId:$userId){
            id
            isFollowed
            isFollowing
            username
            pictureUrl
        }
    }
`
