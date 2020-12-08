import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import { InputAuthField } from '@/components/utils/InputAuthField'
import RedirectComponent from '@/components/auth/RedirectComponent'
import { InstagramAuthForm } from '@/components/form/InstagramAuthForm'
import OrComponentWithRedirect from '@/components/auth/OrComponentWithRedirect'
import { ForgotPasswordType, useForgotPasswordMutation } from '@/geterated/apollo'

const ForgotPassword = () => {

  const router = useRouter()

  const fieldsItems = useMemo(() => {
    return [{
      name: 'email' as const,
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }]
  }, [])

  const [forgotPassword,{loading}] = useForgotPasswordMutation()

  const forgotPasswordHandler = useCallback(async (data, {setErrors}) => {

    try {
      const response = await forgotPassword({
        variables: {
          email: data
        }
      })
      if (response.data) {
        await router.push('/accounts/check-email')
      }
    } catch (e) {
      console.log(e.graphQLErrors)
      setErrors({password: e.graphQLErrors[0].message})
    }
  }, [])


  return (
      <MainLayout title="Forgot password">
        <div className="change-password__container container">
          <InstagramAuthForm<ForgotPasswordType>
              loading={loading}
              OrOptionsComponent={ <OrComponentWithRedirect
                  link={ '/accounts/register' }
                  text={ 'Create account' }/> }
              RedirectComponent={ <RedirectComponent
                  text={ 'Back to login' }
                  link={ '/accounts/login' }/> }
              submitHandler={ forgotPasswordHandler }
              initialValues={ {email: ''} }
              buttonText={ 'Reset' }
              fields={ fieldsItems }/>
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

export default withApollo({ssr: false})(ForgotPassword)
