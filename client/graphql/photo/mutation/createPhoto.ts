import { gql } from '@apollo/client'

export const createPhotoMutation = gql`
    mutation CreatePhoto($picture:Upload!,$title:String!){
        createPhoto(picture:$picture,title:$title){
            date
            userId
            id
            pictureUrl
            likeCount
            commentCount
            user{
                pictureUrl
                fullName
                username
            }
            comments{
                date
                photoId
                userId
                user{
                    pictureUrl
                    username
                    id
                    email
                    fullName
                }
                commentText
                id
            }
        }
    }
`
