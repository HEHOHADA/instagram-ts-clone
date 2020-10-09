import { GraphQLUpload } from 'graphql-upload'
import { ApolloError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { User } from '@/entity/User'
import { MyContext } from '@/types/MyContext'
import { UploadType } from './types/UploadType'
import { isAuth } from '@/middleware/isAuthMiddleware'
import { processUpload } from '../shared/processUpload'
import { somethingWentWrong } from './utils/errorMessages'



@Resolver()
export class PictureProfileResolver {

  @UseMiddleware(isAuth)
  @Mutation(() => String)
  async setPictureProfile(
      @Ctx(){payload}: MyContext,
      @Arg('picture', () => GraphQLUpload)upload: UploadType) {

    const id = await processUpload(upload)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }

    await User.update({id: payload.userId!},
        {pictureUrl: id})

    return id
  }
}
