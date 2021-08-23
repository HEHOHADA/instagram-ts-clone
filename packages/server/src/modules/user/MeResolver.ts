import 'dotenv/config'
import { Repository } from 'typeorm'
import { verify } from 'jsonwebtoken'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { Service } from 'typedi'

@Resolver(() => User)
@Service()
export class MeResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const auth = ctx.req.headers.authorization
    if (!auth) {
      return undefined
    }
    try {
      const token = (auth as string).split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET as string)
      return await this.userRepository.findOne(
        {
          id: payload.userId
        },
        { cache: true }
      )
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  @FieldResolver(() => String, { nullable: true })
  pictureUrl(@Root() user: User, @Ctx() { imageUrl }: MyContext) {
    if (!user.pictureUrl) {
      return null
    }
    if (user.pictureUrl.includes('http')) {
      return user.pictureUrl
    }
    return `${imageUrl}/images/${user.pictureUrl}`
  }
}
