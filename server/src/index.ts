import 'dotenv/config'
import 'reflect-metadata'
import cors from 'cors'
import Express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import cookieParser from 'cookie-parser'
import { createSchema } from './utils/createSchema'
import { MyContext } from './types/MyContext'
import { redis } from './redis'
import { refreshToken } from './utils/refreshToken'
import { graphqlUploadExpress } from 'graphql-upload'
import { GraphQLError } from 'graphql'
import { createUserLoader } from './utils/createUserLoader'
import { createLikeLoader } from './utils/createLikeLoader'
import { createCommentLoader } from './utils/createCommentLoader'
import { createPhotoLoader } from './utils/createPhotoLoader'


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
    subscriptions: {},
    context: ({req, res}: MyContext) => ({
      redis,
      pubsub,
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

  app.listen(4000, () => {
    console.log('server is running on 4000')
  })
}

server()
