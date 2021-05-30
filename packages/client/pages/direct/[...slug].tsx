import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next'
import { Route, Switch } from 'react-router'

import { useChatsQuery } from '@instagram/common'

import withApollo from '@/lib/withApollo'
import {MainLayout }from '@/components/layouts/MainLayout'
import { ConversationNew } from '@/components/direct/ConversationNew'
import { ConversationList } from '@/components/direct/ConversationList'
import { useMessageReceive } from '@/hooks/useMessageReceive'

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
            <ConversationList
              loading={ loading }
              chats={ data?.chats }/>
            <Switch>
              <Route exact path={ `/direct/inbox` } component={ ConversationNew }/>
              <Route exact path={ `/direct/t/:id` } component={ ConversationItem }/>
            </Switch>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}


export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx.params
  return {
    props: {
      slug: params!.slug
    }
  }
}

export default withApollo({ssr: false})(DirectPages)
