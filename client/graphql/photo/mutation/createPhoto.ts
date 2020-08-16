import { gql } from '@apollo/client'

export const createPhotoMutation = gql`
    mutation CreatePhoto($picture:Upload!,$title:String!){
        createPhoto(picture:$picture,title:$title){
            date
            userId
            id
            isLiked
            isAuthor
            pictureUrl
            likeCount
            commentCount
            user{
                pictureUrl
                fullName
                username
            }
        }
    }
`
