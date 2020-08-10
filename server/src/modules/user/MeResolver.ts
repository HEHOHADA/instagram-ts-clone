import 'dotenv/config'
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'
import { verify } from 'jsonwebtoken'

@Resolver(() => User)
export class MeResolver {
  @Query(() => User, {nullable: true})
  async me(@Ctx() ctx: MyContext) {
    const auth = ctx.req.headers.authorization

    if (!auth) {
      return undefined
    }
    try {
      const token = (auth as string).split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET as string)
      return User.findOne(payload.userId)
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  @FieldResolver(() => String, {nullable: true})
  pictureUrl(@Root()user: User, @Ctx()ctx: MyContext) {

    if (user.pictureUrl.includes('http')) {
      return user.pictureUrl
    }
    return `${ ctx.url }/images/${ user.pictureUrl }`
  }
}
