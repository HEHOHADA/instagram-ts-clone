import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User } from '@entity/User'
import { TokenType } from '@type/Token'
import { sendRefreshToken } from '@helpers/user/auth/sendRefreshToken'
import { createAccessToken, createRefreshToken } from '@helpers/user/auth/createTokens'

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid
  if (!token) {
    return res.send({ ok: false, accessToken: '' })
  }
  let payload: TokenType | null = null
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string) as TokenType
  } catch (e) {
    console.log(e)
    sendRefreshToken(res, '')
    return res.send({ ok: false, accessToken: '' })
  }

  const user = await User.findOne({ id: payload!.userId })

  if (!user || user.tokenVersion !== payload!.tokenVersion) {
    return res.send({ ok: false, accessToken: '' })
  }

  sendRefreshToken(res, createRefreshToken(user))

  return res.send({ ok: true, accessToken: createAccessToken(user) })
}
