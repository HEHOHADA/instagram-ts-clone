import { gql } from '@apollo/client'


export const setPictureProfileMutation = gql`
    mutation SetPictureProfile($picture: Upload!){
        setPictureProfile(picture:$picture)
    }
`
