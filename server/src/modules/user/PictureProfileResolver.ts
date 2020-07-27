import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { GraphQLUpload } from 'graphql-upload'
import { UploadType } from './types/UploadType'
import { processUpload } from '../shared/processUpload'
import { ApolloError } from 'apollo-server-express'
import { somethingWentWrong } from './utils/errorMessages'
import { MyContext } from '../../types/MyContext'
import { User } from '../../entity/User'
import { isAuth } from '../../middleware/isAuthMiddleware'


@Resolver()
export class PictureProfileResolver {

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async setPictureProfile(
      @Ctx(){payload}: MyContext,
      @Arg('picture', () => GraphQLUpload)upload: UploadType) {
    const id = await processUpload(upload)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }

    await User.update({id: payload.userId},
        {pictureUrl: id})

    return true
  }
}
