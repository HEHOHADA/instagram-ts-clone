import path from 'path'
import { buildSchema } from 'type-graphql'
import { loadFilesSync } from '@graphql-tools/load-files'

type ResolverObject = {
  [key: string]: Function
}

export const createSchema = async () => {
  const resolver = loadFilesSync(`${path.join(__dirname, '../modules')}/**/*Resolver.?s`)
  const resolverItems: any = resolver.map((res: ResolverObject) => Object.values(res)[0])

  return await buildSchema({
    resolvers: resolverItems
  })
}
