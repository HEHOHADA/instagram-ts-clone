import { Connection } from 'typeorm'
import { User } from '../../entity/User'
import { testConn } from '../../test-utils/testConn'
import { TestClient } from '../../test-utils/TestClient'


let conn: Connection
let client: TestClient

beforeAll(async (done) => {
  conn = await testConn()
  console.log('conn form register',conn)
  client = new TestClient()
  done()
})

afterAll(async (done) => {
  console.log('conn after delete form register',conn)
  conn.close()
  done()
})

export const registerTestMutation = `
mutation Register($data:RegisterInput!){
  register(data:$data){
    id
    username
    fullName
    email
  }
}
`

describe('Register', () => {
  it('should create user', async () => {

    const rightUser = client.rightClientRegister
    const response = await client.register()
    expect(response).toMatchObject({
      data: {
        register: {
          fullName: rightUser.fullName,
          email: rightUser.email,
          username: rightUser.username
        }
      }
    })

    const dbUser = await User.findOne({where: {email: rightUser.email}})
    expect(dbUser).toBeDefined()
    expect(dbUser?.confirmed).toBeFalsy()
    expect(dbUser?.password).not.toBe(rightUser.password)
    expect(dbUser?.fullName).toBe(rightUser.fullName)
  })

  it('should throw argument exeption', () => {

  })
})
