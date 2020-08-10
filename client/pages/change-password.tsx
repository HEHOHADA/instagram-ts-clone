import React, { useCallback, useMemo } from 'react'
import { useChangeForgotPasswordMutation } from '../geterated/apollo'
import { InputField } from '../components/utils/InputField'
import { useRouter } from 'next/router'
import { InstagramForm } from '../components/form/InstagramForm'
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
      console.log(e.graphQLErrors)
      setErrors({password: e.graphQLErrors[0].message})
    }
  }, [])

  const fieldsItems = useMemo(() => {
    return [{
      name: 'password',
      id: 'password',
      placeholder: 'Password',
      type: 'password',
      component: InputField
    },
    ]
  }, [])


  return (
      <AuthLayout title="Forgot password">
        <InstagramForm
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
