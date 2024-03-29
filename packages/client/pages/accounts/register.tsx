import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import withApollo from '@/lib/withApollo'
import AuthLayout from '@/components/layouts/AuthLayout'
import { InputAuthField } from '@/components/utils/InputAuthField'
import RedirectComponent from '@/components/auth/RedirectComponent'
import { formatValidationErrors } from '@/utils/formatValidationErrors'
import { InstagramAuthForm } from '@/components/form/InstagramAuthForm'
import OrComponentWithRedirect from '@/components/auth/OrComponentWithRedirect'
import { IRegisterInput, useRegisterMutation } from '@/geterated'


const Register = () => {
  const [register, { loading }] = useRegisterMutation()
  const router = useRouter()
  const fieldsItems = useMemo(() => {
    return [{
      name: 'email' as const,
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'username' as const,
      placeholder: 'Username',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'fullName' as const,
      placeholder: 'FullName',
      type: 'text',
      component: InputAuthField
    }, {
      name: 'password' as const,
      placeholder: 'Password',
      type: 'password',
      component: InputAuthField
    }
    ]
  }, [])

  const submitRegisterHandler = useCallback(async (data, { setErrors }) => {
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
      <InstagramAuthForm<IRegisterInput>
        loading={ loading }
        OrOptionsComponent={ <OrComponentWithRedirect
          link={ '/accounts/password/reset' }
          text={ 'Забыли пароль' } /> }
        RedirectComponent={ <RedirectComponent
          text={ 'Login' }
          link={ '/accounts/login' } /> }
        buttonText={ 'Register' }
        fields={ fieldsItems }
        initialValues={ { password: '', email: '', fullName: '', username: '' } }
        submitHandler={ submitRegisterHandler } />
    </AuthLayout>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {}
  }
}
export default withApollo({ ssr: false })(Register)
