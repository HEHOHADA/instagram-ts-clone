import { gCall } from '@/test-utils/gCall'
import { LoginInput } from '@/modules/user/login/LoginInput'
import { loginTestMutation } from '@/modules/test/Login.test'
import { RegisterInput } from '@/modules/user/register/RegisterInput'
import { registerTestMutation } from '@/modules/test/Register.test'


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
