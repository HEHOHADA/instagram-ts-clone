import { Repository } from 'typeorm'
import { GraphQLUpload } from 'graphql-upload'
import { ApolloError } from 'apollo-server-express'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { User } from '@entity/User'
import { UploadType } from '@type/user'
import { MyContext } from '@type/MyContext'
import { processUpload } from '@helpers/shared'
import { somethingWentWrong } from '@helpers/user'
import { isAuth } from '@middleware/isAuthMiddleware'
import { Service } from 'typedi'

@Resolver()
@Service()
export class PictureProfileResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

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
