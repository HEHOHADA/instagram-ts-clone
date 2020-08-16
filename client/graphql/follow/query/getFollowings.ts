import { gql } from '@apollo/client'

export const getFollowingsQuery = gql`
    query GetFollowings($userId:String!){
        getFollowings(userId:$userId){
            id
            isFollowed
            isFollowing
            username
            pictureUrl
        }
    }
`
