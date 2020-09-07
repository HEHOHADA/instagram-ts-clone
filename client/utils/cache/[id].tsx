import React from 'react'
import MainLayout from '../../components/MainLayout'
import withApollo from '../../lib/withApollo'
import { ConversationList } from '../../components/direct/ConversationList'
import { ConversationItem } from '../../components/direct/ConversationItem'
import { useChatsQuery } from '../../geterated/apollo'
import { GetServerSidePropsContext } from 'next'

const Dialog = () => {

  const {data} = useChatsQuery()

  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              <ConversationItem/>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}



export default withApollo({ssr: false})(Dialog)
