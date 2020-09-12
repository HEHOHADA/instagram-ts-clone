import React from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { ChatDocument, useChatsQuery, useMessageReceivedSubscription } from '../../geterated/apollo'
import { ConversationItem } from '../../components/direct/ConversationItem'
import { useApolloClient } from '@apollo/client'


const DirectInbox = () => {
  const {data} = useChatsQuery()
  const client = useApolloClient()
   useMessageReceivedSubscription({
    onSubscriptionData: ({subscriptionData}) => {
      const messageReceived = subscriptionData.data?.messageReceived
      if (messageReceived) {
        client.writeQuery({
          query: ChatDocument,
          variables: {id: messageReceived.chatId},
          data: {
            chat: {messages: [messageReceived]},
          },
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
