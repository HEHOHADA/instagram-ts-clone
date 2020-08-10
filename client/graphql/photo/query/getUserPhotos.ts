import { gql } from '@apollo/client'

export const viewUserPhotoQuery = gql`
    query ViewUserPhoto($username:String!){
        viewUserPhoto(username:$username){
            date
            userId
            photoId
            pictureUrl
        }
    }
`

