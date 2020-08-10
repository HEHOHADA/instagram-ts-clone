import React, { useMemo } from 'react'
import { Field, Formik, FormikHelpers } from 'formik'


export type FormType<T> = {
  submitHandler: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
  initialValues: T
  buttonText: string
  OrOptionsComponent?: JSX.Element | any | null
  RedirectComponent?: JSX.Element | any | null,
  fields: Array<FieldItemsType>
}

export type FieldItemsType = {
  type?: string
  id: string
  name: string
  placeholder: string
  component: React.ComponentType<any>
}

export const InstagramForm = <T extends {}>({
                                              submitHandler,
                                              initialValues,
                                              buttonText,
                                              OrOptionsComponent,
                                              RedirectComponent,
                                              fields
                                            }: FormType<T>) => {

  const fieldsItems = useMemo(() => {
    return fields.map((f: any, i: number) => (
        <Field key={ `FieldItem_${ i }` } { ...f }/>
    ))
  }, [fields])

  return (
      <div className="auth__content__container">
        <div className="auth__form__container">
          <div className="logo__item"/>
          <Formik
              validateOnBlur={ false }
              validateOnChange={ false }
              initialValues={ initialValues }
              onSubmit={ submitHandler }
          >{ ({handleSubmit}) => (
              <form
                  onSubmit={ handleSubmit }
                  className="auth__form">
                <div className="form__container">
                  <div className="form__inputs">
                    { fieldsItems }
                    {/*<Field name="email" placeholder="Email" id="email" component={ InputField }/>*/ }
                    {/*<Field name="password"*/ }
                    {/*       type="password"*/ }
                    {/*       placeholder="Password"*/ }
                    {/*       id="password"*/ }
                    {/*       component={ InputField }/>*/ }
                  </div>
                  <div className="form__submit__btn">
                    <button type="submit" className="submit__btn">
                      { buttonText }
                    </button>
                  </div>
                </div>
              </form>) }
          </Formik>
          { OrOptionsComponent }
          {/*<AuthOptions/>*/ }
          {/*<button className="auth__login__with">With something</button>*/ }
          {/*<a className="auth__forgot__password">Забыли пароль</a>*/ }
        </div>
        { RedirectComponent }
        {/*<div className="auth__change__page">*/ }
        {/*  <div className="change__page__container">*/ }
        {/*    <p className="change__page__items">Смените страницу*/ }
        {/*      <Link href="/accounts/register">*/ }
        {/*        <a className="change__link"> Регистрация</a>*/ }
        {/*      </Link>*/ }
        {/*    </p>*/ }
        {/*  </div>*/ }
        {/*</div>*/ }
      </div>
  )
}
