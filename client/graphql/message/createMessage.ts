import { gql } from '@apollo/client'

export const createMessageMutation = gql`
    mutation CreateMessage($chatId:String!, $text: String!){
        createMessage(chatId:$chatId, text:$text){
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
`
