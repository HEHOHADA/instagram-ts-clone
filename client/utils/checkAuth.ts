import { MyContext } from '../interfaces/MyContext'
import { MeDocument } from '../geterated/apollo'
import redirect from '../lib/redirect'

export const blockRoute = async (ctx: MyContext) => {
  if (!ctx.apolloClient.readQuery({query: MeDocument})?.me) {
    const meQueryData = await ctx.apolloClient.query({
      query: MeDocument
    })
    if (meQueryData.data.me) {
      ctx.apolloClient.writeQuery({query: MeDocument, data: meQueryData.data})
      redirect(ctx, '/')
    }
  } else {
    redirect(ctx, '/')
  }
  return {
    props: {}
  }
}
