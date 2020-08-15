import React, { useCallback, useMemo } from 'react'
import { useChangeForgotPasswordMutation } from '../geterated/apollo'
import { InputAuthField } from '../components/utils/InputAuthField'
import { useRouter } from 'next/router'
import { InstagramAuthForm } from '../components/form/InstagramAuthForm'
import { MyContext } from '../interfaces/MyContext'
import AuthLayout from '../components/AuthLayout'
import OrComponentWithRedirect from '../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../components/auth/RedirectComponent'

const ChangePassword = ({token}: { token: string }) => {

  const [changeForgotPassword] = useChangeForgotPasswordMutation()
  const router = useRouter()

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

        await router.push('/accounts/login')
      }
    } catch (e) {
      // const errors: any = {}
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

ChangePassword.getInitialProps = async ({query: {token}}: MyContext) => {
  return {
    token
  }
}

export default ChangePassword
