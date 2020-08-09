import { Request, Response } from 'express'
import { Redis } from 'ioredis'

export interface MyContext {
  req: Request
  res: Response
  payload: { userId: string }
  redis: Redis
  url:string
}
