import { gql } from '@apollo/client'

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
