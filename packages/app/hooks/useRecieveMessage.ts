import { useApolloClient, useSubscription } from '@apollo/client'
import { IMessageReceivedSubscription, MessageReceivedDocument } from '@instagram/common'


export const useReceivedMessage = () => {
  const client = useApolloClient()
  useSubscription<IMessageReceivedSubscription>(MessageReceivedDocument, {
    onSubscriptionData: ({subscriptionData}) => {
      if (subscriptionData.data?.messageReceived) {
        const {messageReceived} = subscriptionData.data
        console.log(subscriptionData.data)
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
      }
    },
  })
}
