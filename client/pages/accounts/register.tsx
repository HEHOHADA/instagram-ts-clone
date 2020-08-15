import React, { useCallback, useMemo } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { InputAuthField } from '../../components/utils/InputAuthField'
import { useRouter } from 'next/router'
import { RegisterInput, useRegisterMutation } from '../../geterated/apollo'
import { InstagramAuthForm } from '../../components/form/InstagramAuthForm'
import OrComponentWithRedirect from '../../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../../components/auth/RedirectComponent'
import { blockRoute } from '../../utils/checkAuth'
import { formatValidationErrors } from '../../utils/formatValidationErrors'

const Register = () => {
  const [register] = useRegisterMutation()
  const router = useRouter()

  const fieldsItems = useMemo(() => {
    return [{
      name: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'fullName',
      placeholder: 'FullName',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      component: InputAuthField
    },
    ]
  }, [])

  const submitRegisterHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await register({
        variables: {
          data
        }
      })
      if (response?.data) {
        await router.push('/accounts/check-email')
      }

    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'email'))
    }
  }, [])

  return (
      <AuthLayout>
        <InstagramAuthForm<RegisterInput>
            OrOptionsComponent={ <OrComponentWithRedirect
                link={ '/accounts/password/reset' }
                text={ 'Забыли пароль' }/> }
            RedirectComponent={ <RedirectComponent
                text={ 'Login' }
                link={ '/accounts/login' }/> }
            buttonText={ 'Register' }
            fields={ fieldsItems }
            initialValues={ {password: '', email: '', fullName: '', username: ''} }
            submitHandler={ submitRegisterHandler }/>
      </AuthLayout>
  )
}
Register.getInitialProps = blockRoute


export default Register
