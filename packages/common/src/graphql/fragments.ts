import { gql } from '@apollo/client'

export const commentFragment = gql`
  fragment commentItem on Comment{
    date
    userId
    id
    isAuthor
    commentText
    photoId
  }
`
export const photoFragment = gql`
  fragment photoItem on Photo{
    date
    userId
    id
    pictureUrl
    likeCount
    commentCount
    user{
      ...userMe
    }
    comments{
      ...commentItem
      user{
        ...userMe
      }
    }
  }
`
export const userMeFragment = gql`
  fragment userMe on User{
    email
    id
    username
    pictureUrl
    fullName
  }
`
