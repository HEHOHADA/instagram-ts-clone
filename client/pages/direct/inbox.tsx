import React from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { useIsAuth } from '../../utils/useIsAuth'
import { useRouter } from 'next/router'
import { ConversationNew } from '../../components/direct/ConversationNew'
import { useChatsQuery } from '../../geterated/apollo'
import { ConversationItem } from '../../components/direct/ConversationItem'


const DirectInbox = () => {
  useIsAuth()
  const {data, loading, error} = useChatsQuery({
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return <p>loading</p>
  }
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              <ConversationItem id={ 'e737011d-ee80-4118-9b4c-511144c768db' }/>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}

export function getServerSideProps(ctx: any) {
  console.log('ctx', ctx)
  return {
    props: {}
  }
}

export default withApollo({ssr: false})(DirectInbox)
