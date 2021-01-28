import Redis, { RedisOptions } from 'ioredis'

const host = process.env.REDIS_HOST

const options: RedisOptions = {
  host, port: 6379
}

const redis = new Redis(options)

export {
  redis
}
