import React from 'react'

import withApollo from '@/lib/withApollo'
import { MainLayout } from '@/components/layouts'
import { DashboardContainer } from '@/components/dashboard/DashboardStyled'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { Recommendation } from '@/components/dashboard/Recommendation'

const IndexPage = () => {

  return (
    <MainLayout title='Home'>
      <DashboardContainer>
        <DashboardView />
        <Recommendation />
      </DashboardContainer>
    </MainLayout>
  )
}


export default withApollo({ ssr: true })(IndexPage)
