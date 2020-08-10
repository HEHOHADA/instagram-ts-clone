import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { MyContext } from '../../types/MyContext'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { processUpload } from '../shared/processUpload'
import { ApolloError } from 'apollo-server-express'
import { somethingWentWrong } from '../user/utils/errorMessages'
import { Photo } from '../../entity/Photo'
import { isAuth } from '../../middleware/isAuthMiddleware'

@Resolver()
export class CreatePhotoResolver {

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async createPhoto(
      @Ctx(){payload}: MyContext,
      @Arg('picture', () => GraphQLUpload)upload: FileUpload
  ) {
    const id = await processUpload(upload)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }

    const photo = await Photo.create({
      userId: payload.userId!,
      pictureUrl: id
    })

    await photo.save()

    return true
  }
}
