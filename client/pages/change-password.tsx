import React, { useCallback, useMemo } from 'react'
import { useChangeForgotPasswordMutation } from '../geterated/apollo'
import { InputAuthField } from '../components/utils/InputAuthField'
import { useRouter } from 'next/router'
import { InstagramAuthForm } from '../components/form/InstagramAuthForm'
import AuthLayout from '../components/AuthLayout'
import OrComponentWithRedirect from '../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../components/auth/RedirectComponent'
import { NextPageContext } from 'next'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'
import Redirect from '../lib/redirect'
import withApollo from '../lib/withApollo'

const ChangePassword = () => {

  const [changeForgotPassword] = useChangeForgotPasswordMutation()
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
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      component: InputAuthField
    },
    ]
  }, [])


  return (
      <AuthLayout title="Forgot password">
        <InstagramAuthForm
            OrOptionsComponent={ <OrComponentWithRedirect link={ '/accounts/register' }
                                                          text={ 'Create account' }/> }
            RedirectComponent={ <RedirectComponent text={ 'Back to login' }
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
