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
