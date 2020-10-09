import path from 'path'
import { buildSchema } from 'type-graphql'
import { loadFilesSync } from '@graphql-tools/load-files'

type ResolverObject = {
  [key:string]: Function
}

export const createSchema = async () => {
  const resolver = loadFilesSync(
      `${ path.join(__dirname, '../modules') }/**/*Resolver.?s`)
  const resolverItems: any=
      resolver.map((resolver:ResolverObject) => Object.values(resolver)[0])

  return await buildSchema({
    resolvers: resolverItems
  })
}
