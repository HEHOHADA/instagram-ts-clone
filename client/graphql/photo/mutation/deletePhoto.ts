import { gql } from '@apollo/client'

export const deletePhotoMutation = gql`
    mutation DeletePhoto($id:String!){
        deletePhoto(id:$id)
    }
`
