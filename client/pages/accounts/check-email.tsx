import React from 'react'
import { NextPageContext } from 'next'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'

const CheckEmail = () => {
  return (
      <MainLayout title="Check Email">
        <div className="check-email__card container">
          <h1 className="check-email__header">Verify your email</h1>
          <div className="check-email__text">Please check your email & click the link to activate your account</div>
          <div className="check-email__logo">&nbsp;</div>
        </div>
      </MainLayout>
  )
}
export const getServerSideProps = async (ctx: NextPageContext) => {
  if (ctx.req) {
    const jid = getCookieParser(ctx.req)
    if (jid()['jid']) {
      Redirect(ctx, '/')
    }
  }
  return {
    props: {}
  }
}
export default withApollo({ssr: false})(CheckEmail)
