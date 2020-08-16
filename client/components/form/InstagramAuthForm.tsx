import React, { useMemo } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'


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
  name: string
  placeholder: string
  component: React.ComponentType<any>
}

export const InstagramAuthForm = <T extends {}>({
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
          >{ () => (
              <Form
                  className="auth__form">
                <div className="form__container">
                  <div className="form__inputs">
                    { fieldsItems }
                  </div>
                  <div className="form__submit__btn">
                    <button type="submit" className="submit__btn">
                      { buttonText }
                    </button>
                  </div>
                </div>
              </Form>) }
          </Formik>
          { OrOptionsComponent }
        </div>
        { RedirectComponent }
      </div>
  )
}
