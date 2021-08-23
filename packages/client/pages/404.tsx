import React from 'react'

import {MainLayout }from '@/components/layouts/MainLayout'
import withApollo from '@/lib/withApollo'

function Custom404() {
  return <MainLayout title="Page not found"><h1>404 - Page Not Found</h1></MainLayout>
}

export default withApollo({ssr: false})(Custom404)
