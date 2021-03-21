import 'dotenv/config'
import 'reflect-metadata'
import cors from 'cors'
import * as http from 'http'
import * as TypeORM from 'typeorm'
import { createConnection } from 'typeorm'
import Express from 'express'
import { GraphQLError } from 'graphql'
import cookieParser from 'cookie-parser'
import { Container } from 'typedi/Container'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { createSchema, refreshToken } from '@utils/index'
import { createContext } from '@utils/createContext'
import { onConnect } from '@utils/redis'

TypeORM.useContainer(Container)

const server = async () => {
  let retries = 10
  while (retries) {
    try {
      await createConnection()
      // await conn.runMigrations()
      break
    } catch (err) {
      console.log(err)
      retries -= 1
      console.log(`${retries} retries remaining...`)
      // wait 5 seconds before retrying connection to
      // postgres
      await new Promise((res) => {
        console.log(`test env var `)
        setTimeout(res, 5000)
      })
    }
  }
  // const RedisStore = connectRedis(session)
  const app = Express()
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  )

  app.post('/refresh_token', refreshToken)
  app.use(graphqlUploadExpress({ maxFileSize: 16 * 1024 * 1024, maxFiles: 10 }))
  app.use('/images', Express.static('images'))

  // app.use(
  //     session({
  //       store: new RedisStore({
  //         client: redis as any
  //       }),
  //       name: 'qid',
  //       secret: process.env.SESSION_SECRET!,
  //       cookie: {
  //         httpOnly: true,
  //         secure: process.env.NODE_ENV === 'production',
  //         maxAge: 312312321
  //       },
  //       resave: true,
  //       saveUninitialized: true
  //     }))
  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV !== 'production',
    uploads: false,
    tracing: true,
    subscriptions: {
      path: '/subscription',
      onConnect: (connectionParams) => onConnect(connectionParams as { authorization: string })
    },
    context: createContext,
    formatError: (error: GraphQLError) => {
      const { message, path, extensions } = error
      if (extensions?.exception?.validationErrors) {
        return { message, path, extensions }
      }
      return { message, path }
    }
  } as ApolloServerExpressConfig)

  apolloServer.applyMiddleware({ app, cors: false })
  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:${4000}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${4000}${apolloServer.subscriptionsPath}`)
  })
}

server()
