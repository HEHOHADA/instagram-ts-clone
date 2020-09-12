import { gql } from '@apollo/client'

export const messageReceivedSubscription = gql`
    subscription MessageReceived{
        messageReceived{
            text
            date
            chatId
            isAuthor
            user{
                id
                pictureUrl
                username
            }
        }
    }
`
