import { gql } from '@apollo/client'

export const likeMutation = gql`
    mutation Like($photoId:String!){
        like(photoId:$photoId)
    }
`
