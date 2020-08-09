import { gql } from "@apollo/client";

export const getUserInfoQuery = gql`
    query GetUserInfo($username:String){
        getUserInfo(username:$username){
            email
            id
            username
            pictureUrl
            fullName
            followerCount
        }
    }
`
