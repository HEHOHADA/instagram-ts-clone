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
