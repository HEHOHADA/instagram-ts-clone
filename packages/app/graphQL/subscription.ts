import { gql } from '@apollo/client'

export const messageReceivedSubscription = gql`
  subscription MessageReceived{
    messageReceived{
      text
      id
      date
      chatId
      readTime
      isAuthor
      user{
        id
        pictureUrl
        username
      }
    }
  }
`
export const searchQuery = gql`
  query Search($limit:Int!,$cursor:String,$subString:String!){
    search(limit:$limit,cursor:$cursor,subString:$subString){
      items{
        ...userMe
      }
      paginationInfo{
        hasMore
        endCursor
      }
    }
  }
`
