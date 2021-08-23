import { registerTestMutation } from '@modules/test/Register.test'
import { RegisterInput } from '@type/user/register/RegisterInput'
import { LoginInput } from '@type/user/login/LoginInput'
import { loginTestMutation } from '@modules/test/Login.test'
import { gCall } from './gCall'

export class TestClient {
  options: {
    jar: any
    withCredentials: boolean
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
    return gCall({ source: registerTestMutation, variableValues: data })
  }

  async login(data: LoginInput) {
    return gCall({ source: loginTestMutation, variableValues: data })
  }
}
