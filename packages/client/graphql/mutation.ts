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
export const createCommentMutation = gql`
  mutation CreateComment($data:CreateCommentType!){
    createComment(data:$data){
      ...commentItem
      user{
        ...userMe
      }
    }
  }
`
export const deleteCommentMutation = gql`
  mutation DeleteComment($data:DeleteCommentType!){
    deleteComment(data:$data)
  }
`
export const followUserMutation = gql`
  mutation FollowUser($userId:String!){
    followUser(userId:$userId)
  }
`
export const unFollowUserMutation = gql`
  mutation UnFollowUser($userId:String!){
    unFollowUser(userId:$userId)
  }
`
export const likeMutation = gql`
  mutation Like($photoId:String!){
    like(photoId:$photoId)
  }
`
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
export const createPhotoMutation = gql`
  mutation CreatePhoto($picture:Upload!,$title:String!){
    createPhoto(picture:$picture,title:$title){
      date
      userId
      postText
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
export const deletePhotoMutation = gql`
  mutation DeletePhoto($id:String!){
    deletePhoto(id:$id)
  }
`

export const changeForgotPasswordMutation = gql`
  mutation ChangeForgotPassword($data:ChangeForgotPassword!){
    changeForgotPassword(data:$data){
      id
      username
    }
  }
`
export const confirmUserMutation = gql`
  mutation ConfirmUser($token:String!){
    confirmUser(token:$token)
  }
`

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($email:ForgotPasswordType!){
    forgotPassword(email:$email)
  }
`

export const loginMutation = gql`
  mutation Login($data:LoginInput!) {
    login(data:$data) {
      accessToken
      user {
        ...userMe
      }
    }
  }
`

export const logoutMutation = gql`
  mutation Logout{
    logout
  }
`

export const registerMutation = gql`
  mutation Register($data:RegisterInput!){
    register(data:$data){
      ...userMe
    }
  }
`
export const setPictureProfileMutation = gql`
  mutation SetPictureProfile($picture: Upload!){
    setPictureProfile(picture:$picture)
  }
`
