import React from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { ConversationItem } from '../../components/direct/ConversationItem'
import { useIsAuth } from '../../utils/useIsAuth'
import { useChatsQuery, useMeQuery } from '../../geterated/apollo'
import { useRouter } from 'next/router'
import { ConversationNew } from '../../components/direct/ConversationNew'


const DirectPages = () => {

  const router = useRouter()
  const slug = (router.query as any).slug
  let body = slug.length === 1 && slug[0].includes('inbox') ? (
      <ConversationNew/>
  ) : slug.length === 2 && slug[0] === 't' ? (
      <ConversationItem id={ slug[1] as string }/>
  ) : null
  useIsAuth()
  useMeQuery()
  const {data, loading, error} = useChatsQuery()

  if (loading) {
    return <p>loading</p>
  }
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              { body }
              {/*<Switch>*/ }
              {/*  <Route exact path={ `/t/:id` } component={ ConversationItem }/>*/ }
              {/*  <Route exact path={ `/inbox` } component={ ConversationNew }/>*/ }
              {/*</Switch>*/ }
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


// export function getStaticPaths() {
//   return {
//     paths: [
//       '/direct/inbox',
//       '/direct/t/:id'
//     ],
//     fallback: true
//   }
// }
//
//
// export function getStaticProps(ctx: GetStaticPropsContext) {
//
//   const params = ctx.params
//   return {
//     props: {
//       slug: params!.slug![0]
//     }
//   }
// }

export default withApollo({ssr: true})(DirectPages)
