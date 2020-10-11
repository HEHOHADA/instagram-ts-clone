import React from 'react'
import dynamic from 'next/dynamic'
import { GetStaticPropsContext } from 'next'
import { Route, Switch } from 'react-router'

import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import { ConversationNew } from '@/components/direct/ConversationNew'
import { ConversationList } from '@/components/direct/ConversationList'
import { useChatsQuery } from '@/geterated/apollo'
import { useMessageReceive } from '@/hooks/useMessageReceive'
import Loading from '@/components/utils/Loading'

const ConversationItem = dynamic(() => import('@/components/direct/ConversationItem'))

const DirectPages = ({slug}: any) => {
  const {data, loading} = useChatsQuery({
    skip: !slug?.length
  })
  useMessageReceive()

  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              { !data && loading ?
                  <Loading/> :
                  <ConversationList chats={ data?.chats }/>
              }
              <Switch>
                <Route exact path={ `/direct/t/:id` } component={ ConversationItem }/>
                <Route exact path={ `/direct/inbox` } component={ ConversationNew }/>
              </Switch>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export function getStaticPaths() {
  return {
    paths: [
      '/direct/inbox',
      '/direct/t/:id'
    ],
    fallback: true
  }
}


export function getStaticProps(ctx: GetStaticPropsContext) {
  const params = ctx.params
  return {
    props: {
      slug: params!.slug
    }
  }
}

export default withApollo({ssr: false})(DirectPages)
