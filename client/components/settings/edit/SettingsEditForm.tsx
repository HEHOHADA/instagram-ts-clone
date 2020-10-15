import React, { useCallback } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { FieldItemsType } from '@/components/form/InstagramAuthForm'

type SettingEditFormType = {
  validation?: any
  fieldName: keyof SettingsFormValue
  possibleInfo?: JSX.Element
  fieldItem: FieldItemsType<SettingsFormValue>
}

type SettingsFormValue = {
  fullName: string
  username: string
  email: string
}

export const SettingsEditForm = () => {

  const submitForm = useCallback((values: SettingsFormValue, formikHelpers: FormikHelpers<SettingsFormValue>) => {
    console.log(values)
    console.log(formikHelpers)
  }, [])

  return (
      <Formik<SettingsFormValue>
          validateOnBlur={ false }
          validateOnChange={ false }
          initialValues={ {
            fullName: '',
            username: '',
            email: ''
          } }
          onSubmit={ submitForm }
      >{ () => (
          <Form className="settings__change-info">

            <div className="change__item__container">
              <div className="change__name">Имя</div>
              <div className="change__input__container">
                <input placeholder="Введите иия" type="text" className="input__field"/>
                <div className="change__input__info">
                  Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и
                  фамилию, никнейм или название компании.
                  Изменить имя можно не более двух раз в течение 14 дней.
                </div>
              </div>
            </div>
            <div className="form__settings__submit">
              <button
                  type="submit"
                  className="send__form">Отправить
              </button>
              <button className="block__account">Заблокировать аккаунт</button>
            </div>
          </Form>)
      }
      </Formik>
  )
}
