import React from 'react'

import { useRouter } from 'next/router'
import { useIsAuth } from '../../../../utils/useIsAuth'
import { useChatsQuery } from '../../../../geterated/apollo'
import { ConversationItem } from '../../../../components/direct/ConversationItem'
import MainLayout from '../../../../components/MainLayout'
import { ConversationList } from '../../../../components/direct/ConversationList'
import withApollo from '../../../../lib/withApollo'


const DirectPages = ({id}:{id:string}) => {
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


export function getServerSideProps(ctx: any) {
  console.log('ctx', ctx)
  return {
    props: {
      id: ctx.query.id
    }
  }
}

export default withApollo({ssr: false})(DirectPages)
