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
describe('Registe2r', () => {
  it('should create user', async () => {

  })
})
