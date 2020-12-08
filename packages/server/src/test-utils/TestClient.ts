import { RegisterInput } from '../modules/user/register/RegisterInput'
import { gCall } from './gCall'
import { registerTestMutation } from 'src/modules/test/Register.test'
import { LoginInput } from '../modules/user/login/LoginInput'
import { loginTestMutation } from '../modules/test/Login.test'

export class TestClient {
  options: {
    jar: any,
    withCredentials: boolean,
    json: boolean
    headers?: any
  }

  constructor() {
    this.options = {
      withCredentials: true,
      json: true,
      jar: {}
    }
  }

  async register(data: RegisterInput) {
    return gCall({source: registerTestMutation, variableValues: data})
  }


  async login(data: LoginInput) {
    return gCall({source: loginTestMutation, variableValues: data})
  }
}
