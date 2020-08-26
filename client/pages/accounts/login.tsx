import React, { useCallback, useMemo } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from '../../geterated/apollo'
import { setAccessToken } from '../../lib/token'
import { useRouter } from 'next/router'
import { InstagramAuthForm } from '../../components/form/InstagramAuthForm'
import { InputAuthField } from '../../components/utils/InputAuthField'
import OrComponentWithRedirect from '../../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../../components/auth/RedirectComponent'
import { formatValidationErrors } from '../../utils/formatValidationErrors'
import withApollo from '../../lib/withApollo'

const Login = () => {
  const [login] = useLoginMutation()
  const router = useRouter()
  if (router.isFallback) {
    router.push('/')
  }
  const submitLoginHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await login({
        variables: {
          data
        }, update: (cache, {data}) => {
          if (!data || !data.login) {
            return
          }

          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user
            }
          })
        }

      })
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken)
      }

      await router.push('/')

    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'email'))
    }
  }, [])


  const fieldsItems = useMemo(() => {
    return [{
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'password',
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



export default withApollo({ssr:false})(Login)
