import { Ctx, Mutation, Resolver } from 'type-graphql'

import { MyContext } from '@/types/MyContext'
import { sendRefreshToken } from './auth/sendRefreshToken'

@Resolver()
export class LogoutResolver {

  @Mutation(() => Boolean)
  async logout(
      @Ctx() ctx: MyContext
  ) {
    sendRefreshToken(ctx.res, '')
    return true
    // return new Promise((resolve, reject) => ctx.req.session!.destroy((e) => {
    //   if (e) {
    //     console.log(e)
    //     return reject(e)
    //   }
    //   ctx.res.clearCookie('qid')
    //   resolve(true)
    // }))
  }
}
