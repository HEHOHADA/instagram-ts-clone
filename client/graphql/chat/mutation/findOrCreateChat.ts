import { gql } from '@apollo/client'

export const findOrCreateChatMutation = gql`
    mutation FindOrCreateChat($userId:String!){
        findOrCreateChat(userId:$userId){
            id
            users{
                username
                id
                isCurrentUser
                pictureUrl
            }
            messages{
                text
                date
                readTime
                isAuthor
            }
        }
    }
`
