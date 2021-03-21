import { Connection } from 'typeorm'
import * as faker from 'faker'

import { RegisterInput } from '@type/user/register/RegisterInput'
import { testConn } from '../test-utils/testConn'
import { User } from '@entity/User'
import { gCall } from '../test-utils/gCall'

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
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
    const user: RegisterInput = {
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(5),
      username: faker.internet.userName()
    }

    const response = await gCall({
      source: registerTestMutation,
      variableValues: {
        data: user
      }
    })
    expect(response).toMatchObject({
      data: {
        register: {
          fullName: user.fullName,
          email: user.email,
          username: user.username
        }
      }
    })

    const dbUser = await User.findOne({ where: { email: user.email } })
    expect(dbUser).toBeDefined()
    expect(dbUser?.confirmed).toBeFalsy()
    expect(dbUser?.password).not.toBe(user.password)
    expect(dbUser?.fullName).toBe(user.fullName)
  })

  it('should throw argument exeption', () => {})
})
