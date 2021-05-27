import { GraphQLError, GraphQLSchema } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { onConnect } from '@utils/redis'
import { createContext } from '@helpers/apollo'

export function createServer(schema: GraphQLSchema) {
  return new ApolloServer({
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
  })
}
