import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next'

import withApollo from '@/lib/withApollo'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ConversationNew } from '@/components/direct/ConversationNew'
import { ConversationList } from '@/components/direct/ConversationList'
import { useMessageReceive } from '@/hooks/useMessageReceive'
import { useChatsQuery } from '@/geterated'

const ConversationItem = dynamic(() => import('@/components/direct/ConversationItem'))

const DirectPages = ({ slug }: any) => {
  const { data, loading } = useChatsQuery({
    skip: !slug?.length
  })
  useMessageReceive()

  return (
    <MainLayout title='Direct'>
      <div className='direct'>
        <div className='direct__container'>
          <div className='direct__items__container'>
            <ConversationList
              loading={ loading }
              chats={ data?.chats } />
            { slug.length === 1 ?
              <ConversationNew /> :
              <ConversationItem id={slug[1]} /> }
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

export default withApollo({ ssr: false })(DirectPages)
