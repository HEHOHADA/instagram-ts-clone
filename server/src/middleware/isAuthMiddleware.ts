import { verify } from 'jsonwebtoken'
import { MiddlewareFn, UnauthorizedError } from 'type-graphql'
import { MyContext } from '../types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({context}, next) => {

  const auth = context.req.headers.authorization
  if (!auth) {
    throw new UnauthorizedError()
  }

  try {
    const token = (auth as string).split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET! as string)

    context.payload = payload as any
  } catch (e) {
    throw new UnauthorizedError()
  }

  return next()
}
