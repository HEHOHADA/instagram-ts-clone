import { createConnection } from 'typeorm'

export const testConn = (drop: boolean = false) =>
  createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'bulat551',
    database: 'instagram-gql-ts-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [`${__dirname}/../entity/**/*.*`]
  })
