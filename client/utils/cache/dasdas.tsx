import React, { FC, useEffect } from 'react'
import { InfoMark } from '../utils/svg/InfoMark'
import {
  CreateMessageMutationVariables,
  MessageReceivedDocument,
  useChatQuery,
  useCreateMessageMutation
} from '../../geterated/apollo'
import { Smile } from '../utils/svg/Smile'
import { Picture } from '../utils/svg/Picture'
import { Like } from '../utils/svg/Like'
import { ChatMessage } from './chat/ChatMessage'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextArea } from '../utils/TextArea'

type PropsType = {
  id: string
}

export const ConversationItem: FC<PropsType> = ({id}) => {

  const {data,loading,error, subscribeToMore} = useChatQuery({
    variables: {id}
  })
  const [createMessage] = useCreateMessageMutation()
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MessageReceivedDocument,
      // @ts-ignore
      updateQuery: (cache, {subscriptionData}: any) => {
        debugger
        if (subscriptionData.data) {
          return {
            ...cache,
            chat: {
              messages(cachedValue: any): any[] {
                return [...cachedValue, subscriptionData.data.chat.text]
              }
            }
          }
        }
        return cache
        // const messageReceived = subscriptionData.data.messageReceived
        //     if (messageReceived) {
        //       return{
        //         ...cache,
        //         chat:{
        //           messages(cachedValue){
        //             return[...cachedValue,
        //               (subscriptionData.subscriptionData. as any).chat.text ]
        //           }
        //         }
        //       }}else return cache
        // cache.chat({
        //
        //   variables: {id},
        //   data: {
        //     chat: {...data?.chat, messages: [...(data?.chat.messages || []), messageReceived]},
        //   },
        // })
      }
      // debugger
      // console.log('cache', cache)
      // console.log('subsc data ', subscriptionData)
      // return cache
      //
      // if (!subscriptionData.data) {
      //   return cache
      // }
      // return {
      //   ...cache,
      //   messages: [
      //     ...cache.chat.messages,
      //     (subscriptionData.data as any).chat.text
      //   ]
      // }

    })
    return () => unsubscribe()
  }, [subscribeToMore])
  if (loading || !data || error) {
    return null
  }
  // const {data: das, variables} = useMessageReceivedSubscription({
  //   onSubscriptionData: ({subscriptionData}) => {
  //     console.log('sybs', subscriptionData)
  //     const messageReceived = subscriptionData.data?.messageReceived
  //     if (messageReceived) {
  //       client.writeQuery({
  //         query: ChatDocument,
  //         variables: {id},
  //         data: {
  //           chat: {...data?.chat, messages: [...(data?.chat.messages || []), messageReceived]},
  //         },
  //       })
  //     }
  //   },
  // })
  // console.log('var', variables)

  const createMessageHandler = async (data: any, {resetForm}: FormikHelpers<any>) => {
    const response = await createMessage({
      variables: {
        ...data
      },
      update: (cache, {data}) => {
        cache.modify({
          id: `Chat:${ id }`,
          fields: {
            messages(cachedValue) {
              const messageRef = {'__ref': `Message:${ data?.createMessage.id }`}
              return [...cachedValue, messageRef]
            }
          }
        })
      }
    })
    if (response && response.data) {
      resetForm()
    }
  }

  return (
      <div className="conversation__item">
        <div className="conversation__info">
          <div className="conversation__user">
            <div className="conversation__user__img">
              <img alt="Фото профиля tagir_sl"
                   src={ data?.chat.users[0].pictureUrl! }
                   className="_6q-tv" data-testid="user-avatar"
                   draggable="false"/>
            </div>
            <div className="conversation__user__name">{ data?.chat.users[0].username }</div>
          </div>
          <div className="user__info">
            <InfoMark/>
          </div>
        </div>
        <div className="conversation__messages__container">
          <div className="conversation__messages">
            { data?.chat.messages.map((m) => (
                <ChatMessage
                    date={ m.date }
                    key={ m.id }
                    text={ m.text }
                    pictureUrl={ m.user.pictureUrl }
                    isAuthor={ m.isAuthor }/>

            )) }
          </div>
        </div>
        <div className="conversation__form__container">
          <Formik<CreateMessageMutationVariables>
              onSubmit={ createMessageHandler }
              initialValues={ {text: '', chatId: id} }
          >
            { ({dirty}) => (
                <Form className="conversation__form__items">
                  <div className="message__smile">
                    <Smile/>
                  </div>
                  <div className="message__input__container">
                    <Field
                        required
                        placeholder="Введите сообщение"
                        className="message__input"
                        name="text"
                        component={ TextArea }
                    />
                  </div>
                  { !dirty ?
                      <>
                        <div className="message__photo">
                          <Picture/>
                        </div>
                        <div className="message__like">
                          <Like/>
                        </div>
                      </>
                      :
                      <button
                          type="submit"

                          className="comment__btn">Отправить
                      </button>
                  }
                </Form>
            ) }
          </Formik>

        </div>
      </div>
  )
}
