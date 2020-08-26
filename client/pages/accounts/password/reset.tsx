import React, { useCallback, useMemo } from 'react'
import MainLayout from '../../../components/MainLayout'
import { ForgotPasswordType, useForgotPasswordMutation } from '../../../geterated/apollo'
import { InstagramAuthForm } from '../../../components/form/InstagramAuthForm'
import { InputAuthField } from '../../../components/utils/InputAuthField'
import { useRouter } from 'next/router'
import RedirectComponent from '../../../components/auth/RedirectComponent'
import OrComponentWithRedirect from '../../../components/auth/OrComponentWithRedirect'
import { blockRoute } from '../../../utils/checkAuth'

const ForgotPassword = () => {

  const router = useRouter()

  const fieldsItems = useMemo(() => {
    return [{
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
      }]
  }, [])

  const [forgotPassword] = useForgotPasswordMutation()

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
      // const errors: any = {}
      console.log(e.graphQLErrors)
      setErrors({password: e.graphQLErrors[0].message})
    }
  }, [])


  return (
      <MainLayout title="Forgot password">
        <div className="change-password__container container">
          <InstagramAuthForm<ForgotPasswordType>
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
// ForgotPassword.getInitialProps = blockRoute

export default ForgotPassword
