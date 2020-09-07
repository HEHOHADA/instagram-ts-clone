import 'dotenv/config'
import 'reflect-metadata'
import cors from 'cors'
import Express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import cookieParser from 'cookie-parser'
import { createSchema } from './utils/createSchema'
import { redis } from './redis'
import { refreshToken } from './utils/refreshToken'
import { graphqlUploadExpress } from 'graphql-upload'
import { GraphQLError } from 'graphql'
import { createUserLoader } from './utils/createUserLoader'
import { createLikeLoader } from './utils/createLikeLoader'
import { createCommentLoader } from './utils/createCommentLoader'
import { createPhotoLoader } from './utils/createPhotoLoader'
import { verify } from 'jsonwebtoken'
import * as http from 'http'


// typeorm.useContainer(Container)

const server = async () => {
  await createConnection()
  // const RedisStore = connectRedis(session)
  const app = Express()
  app.use(cookieParser())
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))

  app.post('/refresh_token', refreshToken)
  app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}))
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

  const pubsub = new PubSub()
  const apolloServer = new ApolloServer({
    schema,
    uploads: false,
    tracing: true,
    subscriptions: {
      path:'/subscription',
      onConnect: async (_connectionParams: any) => {
        const token = (_connectionParams as any).Authorization.split(' ')[1]
        // const {cookie} = ws.upgradeReq.headers
        // const token = cookie.replace('token=Bearer%20', '')
        const verifiedToken = verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        const {userId}: any = verifiedToken
        return {userId}
      },
    },
    context: ({req, res, connection}) => ({
      redis,
      pubsub,
      connection,
      req, res,
      userLoader: createUserLoader(),
      likeLoader: createLikeLoader(),
      commentLoader: createCommentLoader(),
      photoLoader: createPhotoLoader(),
      url: req ? (req.protocol + '://' + req.get('host')) : ''
    }),
    formatError: (error: GraphQLError) => {
      const {message, path, extensions} = error
      if (extensions?.exception?.validationErrors) {
        return {message, path, extensions}
      } else {
        return {message, path}
      }
    }
  })

  apolloServer.applyMiddleware({app, cors: false})
  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:${4000}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${4000}${apolloServer.subscriptionsPath}`)
  })
}

server()
