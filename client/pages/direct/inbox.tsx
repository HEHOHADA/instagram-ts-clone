import React from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { useChatsQuery } from '../../geterated/apollo'
import { ConversationNew } from '../../components/direct/ConversationNew'


const DirectInbox = () => {
  const {data} = useChatsQuery()
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              { !data ?
                  <h1>Somethimng went Wrong</h1> :
                  <ConversationList chats={ data.chats }/> }
              <ConversationNew/>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: false})(DirectInbox)
