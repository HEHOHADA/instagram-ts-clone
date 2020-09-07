import { gql } from '@apollo/client'

export const messageReceivedSubscription = gql`
    subscription MessageReceived{
        messageReceived{
            text
            date
            isAuthor
            user{
                id
                pictureUrl
                username
            }
        }
    }
`
