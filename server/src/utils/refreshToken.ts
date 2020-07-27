import { verify } from 'jsonwebtoken'
import { User } from '../entity/User'
import { sendRefreshToken } from '../modules/user/auth/sendRefreshToken'
import { createAccessToken, createRefreshToken } from '../modules/user/auth/createTokens'

export const refreshToken = async (req: any, res: any) => {
  const token = req.cookies.jid

  if (!token) {
    return res.send({ok: false, accessToken: ''})
  }

  let payload: any = null
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string)
  } catch (e) {
    console.log(e)
    return res.send({ok: false, accessToken: ''})
  }

  const user = await User.findOne({id: payload.userid})

  if (!user || user.tokenVersion !== payload.tokenVersion) {
    return res.send({ok: false, accessToken: ''})
  }

  sendRefreshToken(res, createRefreshToken(user))

  return res.send({ok: true, accessToken: createAccessToken(user)})
}
