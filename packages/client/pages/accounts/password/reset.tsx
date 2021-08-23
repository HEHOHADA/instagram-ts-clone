import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import withApollo from '@/lib/withApollo'
import { MainLayout } from '@/components/layouts/MainLayout'
import { InputAuthField } from '@/components/utils/InputAuthField'
import RedirectComponent from '@/components/auth/RedirectComponent'
import { InstagramAuthForm } from '@/components/form/InstagramAuthForm'
import OrComponentWithRedirect from '@/components/auth/OrComponentWithRedirect'
import { IForgotPasswordType, useForgotPasswordMutation } from '@/geterated'

const ForgotPassword = () => {
  const router = useRouter()
  const fieldsItems = useMemo(() => {
    return [{
      name: 'email' as const,
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      component: InputAuthField
    }]
  }, [])

  const [forgotPassword, { loading }] = useForgotPasswordMutation()

  const forgotPasswordHandler = useCallback(async (data, { setErrors }) => {
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
      setErrors({ password: e.graphQLErrors[0].message })
    }
  }, [])


  return (
    <MainLayout title='Forgot password'>
      <div className='change-password__container container'>
        <InstagramAuthForm<IForgotPasswordType>
          loading={ loading }
          OrOptionsComponent={ <OrComponentWithRedirect
            link='/accounts/register'
            text='Create account' /> }
          RedirectComponent={ <RedirectComponent
            text='Back to login'
            link='/accounts/login' /> }
          submitHandler={ forgotPasswordHandler }
          initialValues={ { email: '' } }
          buttonText='Reset'
          fields={ fieldsItems } />
      </div>
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {}
  }
}

export default withApollo({ ssr: false })(ForgotPassword)
