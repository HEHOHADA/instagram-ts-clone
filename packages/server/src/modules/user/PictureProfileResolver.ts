import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { GraphQLUpload } from 'graphql-upload'
import { ApolloError } from 'apollo-server-express'
import { MyContext } from '@type/MyContext'
import { User } from '@entity/User'
import { isAuth } from '@middleware/isAuthMiddleware'
import { UploadType } from '@type/user/UploadType'
import { processUpload } from '../shared/processUpload'
import { somethingWentWrong } from '../../helpers/user/errorMessages'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class PictureProfileResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  @UseMiddleware(isAuth)
  @Mutation(() => String)
  async setPictureProfile(
    @Ctx() { payload }: MyContext,
    @Arg('picture', () => GraphQLUpload) upload: UploadType
  ) {
    const id = await processUpload(upload)

    if (!id) {
      throw new ApolloError(somethingWentWrong)
    }

    await this.userRepository.update({ id: payload.userId! }, { pictureUrl: id })

    return id
  }
}
