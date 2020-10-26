import Redis from 'ioredis'

const redisPort = process.env.REDIS_PORT

export const redis = new Redis(redisPort)
