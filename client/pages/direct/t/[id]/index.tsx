import React from 'react'
import { ChatDocument, MeDocument, useChatsQuery } from '../../../../geterated/apollo'
import { ConversationItem } from '../../../../components/direct/ConversationItem'
import MainLayout from '../../../../components/MainLayout'
import { ConversationList } from '../../../../components/direct/ConversationList'
import withApollo from '../../../../lib/withApollo'
import { useApolloClient } from '@apollo/client'


const DirectPages = ({id}: { id: string }) => {
  const {data, loading, error} = useChatsQuery({
    skip: !id,
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return <p>loading</p>
  }
  return (
      <MainLayout title="Direct">
        <div className="direct">
          <div className="direct__container">
            <div className="direct__items__container">
              <ConversationList chats={ data?.chats }/>
              <ConversationItem id={ id }/>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export async function getStaticProps() {
  const apolloClient = useApolloClient()

  await apolloClient.query({
    query: MeDocument
  })

  return {
    props: {
    }
  }
}

export default withApollo({ssr: false})(DirectPages)
