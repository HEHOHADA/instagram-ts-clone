import { verify } from 'jsonwebtoken'
import { Ctx, Query, Resolver } from 'type-graphql'

import { User } from '@/entity/User'
import { MyContext } from '@/types/MyContext'
import { sendRefreshToken } from './sendRefreshToken'
import { RefreshResponseType } from './RefreshResponseType'
import { createAccessToken, createRefreshToken } from './createTokens'

@Resolver()
export class RefreshTokenResolver {
  @Query(() => RefreshResponseType)
  async refreshToken(
      @Ctx(){req, res}: MyContext
  ): Promise<{ accessToken: string, ok: boolean }> {
    const token = req.cookies.jid
    console.log(token)
    if (!token) {
      // res.send({ok: false, accessToken: ''})
      return {
        accessToken: '',
        ok: false
      } as RefreshResponseType
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
      } as RefreshResponseType
    }

    const user = await User.findOne({id: payload.userId})

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      // res.send({ok: false, accessToken: ''})
      return {
        accessToken: '',
        ok: false
      } as RefreshResponseType
    }

    sendRefreshToken(res, createRefreshToken(user))

    // res.send({ok: true, accessToken: createAccessToken(user)})
    return {
      accessToken: createAccessToken(user),
      ok: true
    } as RefreshResponseType
  }
}
