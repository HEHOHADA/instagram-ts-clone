import 'dotenv/config'
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { User } from '@entity/User'
import { MyContext } from '@type/MyContext'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver(() => User)
export class MeResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const auth = ctx.req.headers.authorization
    if (!auth) {
      return undefined
    }
    try {
      const token = (auth as string).split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET as string)
      return this.userRepository.findOne(
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
