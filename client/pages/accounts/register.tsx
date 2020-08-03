import React, { useCallback, useMemo } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { InputField } from '../../components/utils/InputField'
import { useRouter } from 'next/router'
import { RegisterInput, useRegisterMutation } from '../../geterated/apollo'
import { InstagramForm } from '../../components/form/InstagramForm'
import OrComponentWithRedirect from '../../components/auth/OrComponentWithRedirect'
import RedirectComponent from '../../components/auth/RedirectComponent'

const Register = () => {

  const [register] = useRegisterMutation()
  const router = useRouter()


  // const OrOptionsComponent = useMemo(() => {
  //   return (
  //       <>
  //         <OrComponent/>
  //         <button className="auth__login__with">With something</button>
  //         <Link href="/accounts/password/reset">
  //           <a className="auth__forgot__password">Забыли пароль</a>
  //         </Link>
  //       </>
  //   )
  // }, [])
  //
  // const RedirectComponent = useMemo(() => {
  //   return (
  //       <div className="auth__change__page">
  //         <div className="change__page__container">
  //           <p className="change__page__items">Смените страницу
  //             <Link href="/accounts/login">
  //               <a className="change__link">Login</a>
  //             </Link>
  //           </p>
  //         </div>
  //       </div>
  //   )
  // }, [])


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
      console.log(JSON.stringify(e.graphQLErrors[0]))
      const errors: any = {}
      e.graphQLErrors[0]
          .forEach((error: any) => {
            Object.values(error.constraints).forEach((m: any) => {
              errors[error.property] = m
            })
          })
      console.log(errors)
      setErrors(errors)
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

export default Register
