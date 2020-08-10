import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'

export const isUserAuthOrUndefined: MiddlewareFn<MyContext> = async ({context}, next) => {

  const auth = context.req.headers.authorization
  if (!auth) {
    context.payload = {
      userId: null
    }
  }

  try {
    const token = (auth as string).split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET! as string)
    context.payload = payload as any
  } catch {
    context.payload = {
      userId: null
    }
  }

  return next()
}
