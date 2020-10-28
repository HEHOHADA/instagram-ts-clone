import faker from 'faker'
import { gCall } from './gCall'
import { LoginInput } from '../modules/user/login/LoginInput'
import { loginTestMutation } from '../modules/test/Login.test'
import { registerTestMutation } from '../modules/test/Register.test'
import { RegisterInput } from '../modules/user/register/RegisterInput'

export class TestClient {
  options: {
    jar: any,
    withCredentials: boolean,
    json: boolean
    headers?: any
  }
  rightClientRegister: RegisterInput

  constructor() {
    this.options = {
      withCredentials: true,
      json: true,
      jar: {}
    }

    this.rightClientRegister = {
      fullName: `${ faker.name.firstName() } ${ faker.name.lastName() }`,
      email: faker.internet.email(),
      password: faker.internet.password(5),
      username: faker.internet.userName()
    }
  }

  async register(data: RegisterInput = this.rightClientRegister) {
    return gCall({
      source: registerTestMutation, variableValues: {
        data
      }
    })
  }


  async login(data: LoginInput = {
    email: this.rightClientRegister.email,
    password: this.rightClientRegister.password
  }) {
    return gCall({
      source: loginTestMutation, variableValues: {
        data
      }
    })
  }
}
