import * as ApolloRefresh from 'apollo-link-token-refresh'

declare module 'apollo-link-token-refresh' {
  type IsTokenValidOrUndefined = (...args: any[]) => Promise<boolean>;
}
