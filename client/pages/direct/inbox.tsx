import React, { useEffect } from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { ChatDocument, useChatsLazyQuery, useMessageReceivedSubscription } from '../../geterated/apollo'
import { ConversationItem } from '../../components/direct/ConversationItem'


const DirectInbox = (props: any) => {
  const [loadChats, {called, loading, data}] = useChatsLazyQuery({
    fetchPolicy: 'cache-first'
  })
  useEffect(() => {
    if (props.apolloClient) {
      loadChats()
    }
  }, [])


  const {data: das, variables} = useMessageReceivedSubscription({
    onSubscriptionData: ({subscriptionData}) => {
      console.log('sybs', subscriptionData)
      const messageReceived = subscriptionData.data?.messageReceived
      if (messageReceived) {
        props.apolloClient.writeQuery({
          query: ChatDocument,
          variables: {id: 'e737011d-ee80-4118-9b4c-511144c768db'}
        })
      }
    },
  })

  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              { data?.chats && <ConversationItem id={ data?.chats[0].id }/> }
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: false})(DirectInbox)
