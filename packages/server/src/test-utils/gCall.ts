import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql'
import { createSchema } from '@utils/createSchema'

interface Options {
  source: string
  variableValues?: Maybe<{
    [ket: string]: any
  }>
  userId?: number
  token?: string
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, userId, token }: Options) => {
  if (!schema) {
    schema = await createSchema()
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      payload: {
        userId
      },
      req: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        res: {
          clearCookie: jest.fn()
        }
      }
    }
  })
}
