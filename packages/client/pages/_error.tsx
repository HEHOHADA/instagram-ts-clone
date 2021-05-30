import React from 'react'

import {MainLayout }from '@/components/layouts/MainLayout'
import withApollo from '@/lib/withApollo'
import Error from 'next/error'

function Custom404() {
  return <MainLayout title='Page not found'>
    <Error statusCode={ 404 | 500 }>
      404 - Page Not Found
    </Error></MainLayout>
}

export default withApollo({ ssr: false })(Custom404)
