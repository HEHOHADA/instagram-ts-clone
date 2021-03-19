import { CorsOptions } from 'cors'

const whiteList = ['http://localhost:3000', 'http://localhost:19006']

export const corsOptions: CorsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (whiteList.indexOf(origin as string) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
