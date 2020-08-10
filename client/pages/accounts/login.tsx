import React, { useCallback, useMemo } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from '../../geterated/apollo'
import { setAccessToken } from '../../lib/token'
import { useRouter } from 'next/router'
import { InstagramForm } from '../../components/form/InstagramForm'
import { InputField } from '../../components/utils/InputField'
import OrComponentWithRedirect from '../../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../../components/auth/RedirectComponent'
import { blockRoute } from '../../utils/checkAuth'

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
      // const errors: any = {}
      console.log(e.graphQLErrors)
      setErrors({email: e.graphQLErrors[0].message})
    }
  }, [])


  const fieldsItems = useMemo(() => {
    return [{
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputField
    }, {
      name: 'password',
      id: 'password',
      placeholder: 'Password',
      type: 'password',
      component: InputField
    },
    ]
  }, [])


  return (
      <AuthLayout>
        <InstagramForm<LoginInput>
            OrOptionsComponent={ <OrComponentWithRedirect link={ '/accounts/password/reset' }
                                                          text={ 'Забыли пароль' }/> }
            RedirectComponent={ <RedirectComponent text={ 'Регистрация' }
                                                   link={ '/accounts/register' }/> }

            buttonText={ 'Login' }
            fields={ fieldsItems }
            initialValues={ {password: '', email: ''} }
            submitHandler={ submitLoginHandler }/>
      </AuthLayout>
  )
}

Login.getInitialProps = blockRoute
// export function getServerSideProps(ctx: MyContext) {
//   console.log('client', ctx.apolloClient)
//   return {
//     props:{}
//   }
// }


export default Login
