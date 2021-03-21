import React from 'react'
import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'

const CheckEmail = () => {
  return (
    <MainLayout title='Check Email'>
      <div className='check-email__card container'>
        <h1 className='check-email__header'>Verify your email</h1>
        <div className='check-email__text'>Please check your email & click the link to activate your
          account
        </div>
        <div className='check-email__logo'>&nbsp;</div>
      </div>
    </MainLayout>
  )
}
export const getServerSideProps = async () => {
  return {
    props: {}
  }
}
export default withApollo({ ssr: false })(CheckEmail)
