import { useApolloClient } from '@apollo/client'
import { useMessageReceivedSubscription } from '@instagram/common'

export const useMessageReceive = () => {
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
}
