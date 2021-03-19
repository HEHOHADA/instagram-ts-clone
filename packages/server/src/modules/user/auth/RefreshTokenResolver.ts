import { Ctx, Query, Resolver } from 'type-graphql'
import { verify } from 'jsonwebtoken'

import { MyContext } from '@type/MyContext'
import { User } from '@entity/User'
import { sendRefreshToken } from './sendRefreshToken'
import { createAccessToken, createRefreshToken } from './createTokens'
import { RefreshResponseType } from './RefreshResponseType'

@Resolver()
export class RefreshTokenResolver {
  @Query(() => RefreshResponseType)
  async refreshToken(@Ctx() { req, res }: MyContext): Promise<RefreshResponseType> {
    const token = req.cookies.jid
    if (!token) {
      // res.send({ok: false, accessToken: ''})
      return {
        accessToken: '',
        ok: false
      }
    }

    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string)
    } catch (e) {
      console.log(e)
      // res.send({ok: false, accessToken: ''})
      return {
        accessToken: '',
        ok: false
      }
    }

    const user = await User.findOne({ id: payload.userId })

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      // res.send({ok: false, accessToken: ''})
      return {
        accessToken: '',
        ok: false
      }
    }

    sendRefreshToken(res, createRefreshToken(user))

    // res.send({ok: true, accessToken: createAccessToken(user)})
    return {
      accessToken: createAccessToken(user),
      ok: true
    }
  }
}
