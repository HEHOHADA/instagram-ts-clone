import React, { useCallback, useMemo } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { InputField } from '../../components/utils/InputField'
import { useRouter } from 'next/router'
import { RegisterInput, useRegisterMutation } from '../../geterated/apollo'
import { InstagramForm } from '../../components/form/InstagramForm'
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
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputField
    }, {
      name: 'username',
      id: 'username',
      placeholder: 'Username',
      type: 'text',
      component: InputField
    }, {
      name: 'fullName',
      id: 'fullName',
      placeholder: 'FullName',
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

  const submitRegisterHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await register({
        variables: {
          data
        }
      })
      if (response?.data) {
        await router.push('/check-email')
      }

    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'email'))
    }
  }, [])

  return (
      <AuthLayout>
        <InstagramForm<RegisterInput>
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
