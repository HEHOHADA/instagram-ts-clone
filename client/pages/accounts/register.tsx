import React, { useCallback } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Field, Formik } from 'formik'
import { InputField } from '../../components/form/InputField'
import AuthOptions from '../../components/auth/AuthOptions'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '../../geterated/apollo'
import Link from 'next/link'

const Register = () => {

  const [register] = useRegisterMutation()
  const router = useRouter()
  const submitLoginHandler = useCallback(async (data, {setErrors}) => {
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
        <div className="auth__content__container">
          <div className="auth__form__container">
            <div className="logo__item"/>
            <Formik
                validateOnBlur={ false }
                validateOnChange={ false }
                initialValues={ {
                  email: '',
                  password: '',
                  fullName: '',
                  username: ''
                } }
                onSubmit={ submitLoginHandler }
            >{ ({handleSubmit}) => (
                <form
                    onSubmit={ handleSubmit }
                    className="auth__form">
                  <div className="form__container">
                    <div className="form__inputs">
                      <Field name="email" placeholder="Email" id="email" component={ InputField }/>
                      <Field name="fullName" placeholder="Full Name" id="fullName" component={ InputField }/>
                      <Field name="username" placeholder="Username" id="username" component={ InputField }/>
                      <Field name="password"
                             type="password"
                             placeholder="Password"
                             id="password"
                             component={ InputField }/>
                    </div>
                    <div className="form__submit__btn">
                      <button type="submit" className="submit__btn">
                        Зарегистрироваться
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
                <Link href="/accounts/login">
                  <a className="change__link">логин</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
  )
}

export default Register
