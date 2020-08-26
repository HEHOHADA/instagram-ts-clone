import { gql } from "@apollo/client";

export const getUserInfoQuery = gql`
    query GetUserInfo($username:String!){
        getUserInfo(username:$username){
            ...userMe
            followerCount
            photoCount
            followingCount
            isCurrentUser
            isFollowing
            isFollowed
        }
    }

`
