import React, { FC, useEffect, useRef } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'

import { InfoMark } from '../utils/svg/InfoMark'
import { Smile } from '../utils/svg/Smile'
import { Picture } from '../utils/svg/Picture'
import { Like } from '../utils/svg/Like'
import { ChatMessage } from './chat/ChatMessage'
import { TextArea } from '../utils/TextArea'
import { Button } from '../utils/Button'
import {
  ICreateMessageMutationVariables,
  useChatQuery,
  useCreateMessageMutation
} from '@/geterated'


const ConversationItem: FC<{ id: string }> = ({ id }) => {
  const { data } = useChatQuery({
    variables: { id }
  })

  const [createMessage] = useCreateMessageMutation()
  const ref = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = () => {
    if (ref.current) {
      const scrollHeight = ref.current.scrollHeight
      const height = ref.current.clientHeight
      const maxScrollTop = scrollHeight - height
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  useEffect(scrollToBottom, [data?.chat.messages.length])

  const createMessageHandler = async (data: ICreateMessageMutationVariables,
    { resetForm }: FormikHelpers<ICreateMessageMutationVariables>) => {
    const response = await createMessage({ variables: { ...data } })
    if (response && response.data) {
      resetForm()
    }
  }
  return (
    <div className='conversation__item'>
      <div className='conversation__info'>
        <div className='conversation__user'>
          <div className='conversation__user__img'>
            <img alt='Фото профиля tagir_sl'
                 src={ data?.chat.users[0].pictureUrl! }
            />
          </div>
          <div className='conversation__user__name'>{ data?.chat.users[0].username }</div>
        </div>
        <div className='user__info'>
          <InfoMark />
        </div>
      </div>
      <div className='conversation__messages__container' ref={ ref }>
        <div className='conversation__messages'>
          { data?.chat.messages.map((m) => (
            <ChatMessage
              date={ m.date }
              key={ m.id }
              text={ m.text }
              pictureUrl={ m.user.pictureUrl as string }
              isAuthor={ m.isAuthor } />
          )) }
        </div>
      </div>
      <div className='conversation__form__container'>
        <Formik<ICreateMessageMutationVariables>
          onSubmit={ createMessageHandler }
          initialValues={ { text: '', chatId: id } }
        >
          { ({ dirty }) => (
            <Form className='conversation__form__items'>
              <div className='message__smile'>
                <Smile />
              </div>
              <div className='message__input__container'>
                <Field
                  required
                  placeholder='Введите сообщение'
                  className='message__input'
                  name='text'
                  component={ TextArea }
                />
              </div>
              { !dirty ?
                <>
                  <div className='message__photo'>
                    <Picture />
                  </div>
                  <div className='message__like'>
                    <Like />
                  </div>
                </>
                :
                <Button
                  type='submit'
                  className='comment__btn' text='Отправить' />
              }
            </Form>
          ) }
        </Formik>
      </div>
    </div>
  )
}

export default ConversationItem
