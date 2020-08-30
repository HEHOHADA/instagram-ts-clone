export const loginTestMutation =`
mutation Login($data:LoginInput!){
  login(data:$data){
      user{
      id
      username
      pictureUrl
      email
      fullName
    }
    accessToken
  }
}
`
