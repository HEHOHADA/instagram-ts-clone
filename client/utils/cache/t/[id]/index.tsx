import React from 'react'
import { useApolloClient } from '@apollo/client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useChatsQuery, useMessageReceivedSubscription } from '../../../../geterated/apollo'
import { ConversationItem } from '../../../../components/direct/ConversationItem'
import MainLayout from '../../../../components/MainLayout'
import { ConversationList } from '../../../../components/direct/ConversationList'
import withApollo from '../../../../lib/withApollo'


const DirectPages = ({id}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {data, loading, error} = useChatsQuery({
    skip: !id
  })
  const client = useApolloClient()
  useMessageReceivedSubscription({
    onSubscriptionData: ({subscriptionData}) => {
      const messageReceived = subscriptionData.data?.messageReceived
      if (messageReceived) {
        client.cache.modify({
          id: `Chat:${ messageReceived.chatId }`,
          fields: {
            messages(cachedValue) {
              const messageRef = {'__ref': `Message:${ messageReceived.id }`}
              return [...cachedValue, messageRef]
            },
            lastMessage() {
              return {
                '__typename': 'Message',
                date: messageReceived.date,
                text: messageReceived.text
              }
            },
            unread() {
              return messageReceived.isAuthor
            }
          }
        })
      }
    },
  })
  if (loading || error) {
    return <p>loading</p>
  }
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              <ConversationItem id={ id as string }/>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params!.id
  return {
    props: {
      id
    }
  }
}

export default withApollo({ssr: false})(DirectPages)
