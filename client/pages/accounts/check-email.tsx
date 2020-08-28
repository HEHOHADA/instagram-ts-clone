import React from 'react'
import MainLayout from '../../components/MainLayout'
import { useBlockRoute } from '../../utils/useBlockRoute'

const CheckEmail = () => {
  useBlockRoute()
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

export default CheckEmail
