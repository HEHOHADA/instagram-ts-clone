import React, { useCallback } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { useLoginMutation } from '../../geterated/apollo'
import { Field, Formik } from 'formik'
import { InputField } from '../../components/form/InputField'
import { setAccessToken } from '../../lib/token'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthOptions from '../../components/auth/AuthOptions'

const Login = () => {
  const [login] = useLoginMutation()
  const router = useRouter()
  const submitLoginHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await login({
        variables: {
          data
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
  return (
      <AuthLayout>
        <div className="auth__content__container">
          <div className="auth__form__container">
            <div className="logo__item"/>
            <Formik
                validateOnBlur={ false }
                validateOnChange={ false }
                initialValues={ {
                  email: '',
                  password: ''
                } }
                onSubmit={ submitLoginHandler }
            >{ ({handleSubmit}) => (
                <form
                    onSubmit={ handleSubmit }
                    className="auth__form">
                  <div className="form__container">
                    <div className="form__inputs">
                      <Field name="email" placeholder="Email" id="email" component={ InputField }/>
                      <Field name="password"
                             type="password"
                             placeholder="Password"
                             id="password"
                             component={ InputField }/>
                    </div>
                    <div className="form__submit__btn">
                      <button type="submit" className="submit__btn">
                        Войти
                      </button>
                    </div>
                  </div>
                </form>) }
            </Formik>
            <AuthOptions/>
          </div>
          <div className="auth__change__page">
            <div className="change__page__container">
              <p className="change__page__items">Смените страницу
                <Link href="/accounts/register">
                  <a className="change__link"> Регистрация</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
  )
}

// export async function getServerSideProps(ctx: any) {
//   console.log(ctx)
//   const [login] = useLoginMutation()
//   return {
//     login
//   }
// }

export default Login
