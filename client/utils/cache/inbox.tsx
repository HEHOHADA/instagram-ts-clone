import React from 'react'
import withApollo from '../../lib/withApollo'
import MainLayout from '../../components/MainLayout'
import { ConversationList } from '../../components/direct/ConversationList'
import { ConversationItem } from '../../components/direct/ConversationItem'
import { useIsAuth } from '../useIsAuth'
import { useChatsQuery } from '../../geterated/apollo'


const DirectPages = () => {
  useIsAuth()
  const {data, loading} = useChatsQuery()

  if (loading) {
    return <p>loading</p>
  }
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              <ConversationItem/>
              {/*<Switch>*/ }
              {/*  <Route exact path={ `/t/:id` } component={ ConversationItem }/>*/ }
              {/*  <Route exact path={ `/inbox` } component={ ConversationNew }/>*/ }
              {/*</Switch>*/ }
            </div>
          </div>
        </div>
      </MainLayout>
  )
}



export default withApollo({ssr: false})(DirectPages)
