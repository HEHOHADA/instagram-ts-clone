import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'

import { useChangeForgotPasswordMutation } from '@instagram/common'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import AuthLayout from '@/components/AuthLayout'
import { InputAuthField } from '@/components/utils/InputAuthField'
import RedirectComponent from '@/components/auth/RedirectComponent'
import { InstagramAuthForm } from '@/components/form/InstagramAuthForm'
import OrComponentWithRedirect from '@/components/auth/OrComponentWithRedirect'

const ChangePassword = () => {

  const [changeForgotPassword, {loading}] = useChangeForgotPasswordMutation()
  const router = useRouter()
  const token = typeof router.query.token === 'string' ? router.query.token : -1
  const changePasswordHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await changeForgotPassword({
        variables: {
          data: {
            ...data,
            token
          }
        }
      })
      if (response.data) {
        router.push('/accounts/login')
      }
    } catch (e) {
      setErrors({password: e.graphQLErrors[0].message})
    }
  }, [])

  const fieldsItems = useMemo(() => {
    return [{
      name: 'password' as const,
      placeholder: 'Password',
      type: 'password',
      component: InputAuthField
    },
    ]
  }, [])


  return (
      <AuthLayout title="Forgot password">
        <InstagramAuthForm
            loading={ loading }
            OrOptionsComponent={
              <OrComponentWithRedirect
                  link={ '/accounts/register' }
                  text={ 'Create account' }/> }
            RedirectComponent={ <RedirectComponent
                text={ 'Back to login' }
                link={ '/accounts/login' }/> }
            submitHandler={ changePasswordHandler }
            initialValues={ {password: ''} }
            buttonText={ 'Change' }
            fields={ fieldsItems }/>
      </AuthLayout>
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

export default withApollo({ssr: false})(ChangePassword)
