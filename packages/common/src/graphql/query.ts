import { gql } from '@apollo/client'

export const chatQuery = gql`
  query Chat($id:String!){
    chat(id:$id){
      users{
        username
        id
        isCurrentUser
        pictureUrl
      }
      id
      messages{
        text
        id
        user{
          username
          pictureUrl
        }
        date
        readTime
        isAuthor
      }
    }
  }
`

export const chatsQuery = gql`
  query Chats{
    chats{
      id
      unread
      users{
        pictureUrl
        username
      }
      lastMessage{
        date
        text
      }
    }
  }
`
export const getFollowersQuery = gql`
  query GetFollowers($userId:String!){
    getFollowers(userId:$userId){
      id
      isFollowed
      isFollowing
      username
      fullName
      followerCount
      pictureUrl
    }
  }
`
export const getFollowingsQuery = gql`
  query GetFollowings($userId:String!){
    getFollowings(userId:$userId){
      id
      isFollowed
      isFollowing
      username
      fullName
      followerCount
      pictureUrl
    }
  }
`
export const feedQuery = gql`
  query Feed($limit:Int!,$cursor:String){
    feed(limit:$limit,cursor:$cursor){
      items{
        isLiked
        isAuthor
        postText
        ...photoItem
      }
      paginationInfo{
        hasMore
        endCursor
      }
    }
  }
`
export const viewUserPhotoQuery = gql`
  query ViewUserPhoto($username:String!){
    viewUserPhoto(username:$username){
      date
      userId
      id
      pictureUrl
    }
  }
`

export const getPhotoById = gql`
  query ViewPhotoById($id:String!){
    viewPhotoById(id:$id){
      isLiked
      isAuthor
      postText
      ...photoItem
    }
  }
`
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
export const meQuery = gql`
  query Me{
    me{
      ...userMe
    }
  }
`
