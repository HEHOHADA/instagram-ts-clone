import { sign } from 'jsonwebtoken'
import { User } from '@/entity/User'

export const createAccessToken = (user: User) => {
  return sign(
      {userId: user.id},
      process.env.ACCESS_TOKEN_SECRET! as string,
      {expiresIn: '15m'}
  )
}

export const createRefreshToken = (user: User) => {
  return sign(
      {userId: user.id,tokenVersion: user.tokenVersion},
      process.env.REFRESH_TOKEN_SECRET! as string,
      {expiresIn: '7d'}
  )
}
