import { Connection } from 'typeorm'
import { TestClient } from '../../test-utils/TestClient'
import { User } from '../../entity/User'
import { testConn } from '../../test-utils/testConn'

export const loginTestMutation = `
mutation Login($data:LoginInput!){
  login(data:$data){
      user{
      username
      pictureUrl
      email
      fullName
    }
    accessToken
  }
}
`

let conn: Connection
let client: TestClient

beforeAll(async (done) => {
  conn = await testConn()
  console.log('conn form login',conn)
  client = new TestClient()
  done()
})

afterAll(async (done) => {
  console.log('conn after delete form login',conn)
  conn.close()
  done()
})

describe('login', () => {
  it('should login but i`ll make confirm without email', async () => {
    await client.register()
    const rightUser = client.rightClientRegister
    const dbUser = await User.findOne({where: {email: rightUser.email}})
    // @ts-ignore
    dbUser?.confirmed = true
    dbUser?.save()

    const loginResponse = await client.login()
    expect(loginResponse).toBeDefined()
    expect(loginResponse.data).toHaveProperty('login')
  })
})
