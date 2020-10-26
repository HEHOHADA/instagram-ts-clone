import React, { useMemo } from 'react'
import { NextPageContext } from 'next'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'

import Redirect from '@/lib/redirect'
import useLogin from '@/hooks/useLogin'
import withApollo from '@/lib/withApollo'
import { LoginInput } from '@/geterated/apollo'
import AuthLayout from '@/components/AuthLayout'
import { InputAuthField } from '@/components/utils/InputAuthField'
import { FieldItemsType, InstagramAuthForm } from '@/components/form/InstagramAuthForm'
import RedirectComponent from '@/components/auth/RedirectComponent'
import OrComponentWithRedirect from '@/components/auth/OrComponentWithRedirect'

const Login = () => {
  const {loading, submitLoginHandler} = useLogin()

  const fieldsItems = useMemo(() => {
    return [{
      name: 'email' as const,
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'password' as const,
      id: 'password',
      placeholder: 'Password',
      type: 'password',
      component: InputAuthField
    },
    ]
  }, [])


  return (
      <AuthLayout>
        <InstagramAuthForm<LoginInput>
            loading={ loading }
            OrOptionsComponent={ <OrComponentWithRedirect
                link={ '/accounts/password/reset' }
                text={ 'Забыли пароль' }/> }
            RedirectComponent={ <RedirectComponent
                text={ 'Регистрация' }
                link={ '/accounts/register' }/> }

            buttonText={ 'Login' }
            fields={ fieldsItems }
            initialValues={ {password: '', email: ''} }
            submitHandler={ submitLoginHandler }/>
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

export default withApollo({ssr: false})(Login)
