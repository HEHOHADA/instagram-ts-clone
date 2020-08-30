import { gql } from '@apollo/client'

export const getPhotoById = gql`
    query ViewPhotoById($id:String!){
        viewPhotoById(id:$id){
            isLiked
            isAuthor
            postText
            ...photoItem
        }
    }
`
