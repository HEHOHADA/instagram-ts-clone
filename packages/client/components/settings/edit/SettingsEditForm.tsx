import React, { useCallback, useMemo } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { SettingsEditItem } from './SettingsEditItem'
import { InputField } from '@/components/utils/InputField'
import { FieldItemsType } from '@/components/form/InstagramAuthForm'

type SettingEditFormType = {
  validation?: any
  name: string
  possibleInfo?: JSX.Element
  fieldItem: FieldItemsType<SettingsFormValue>
}

type SettingsFormValue = {
  fullName: string
  username: string
  email: string
}
const PossibleInfo = (
    <div className="change__input__info">
      Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и
      фамилию, никнейм или название компании.
      Изменить имя можно не более двух раз в течение 14 дней.
    </div>
)
export const SettingsEditForm = () => {

  const submitForm = useCallback((values: SettingsFormValue, formikHelpers: FormikHelpers<SettingsFormValue>) => {
    console.log(values)
    console.log(formikHelpers)
  }, [])

  const filedItems = useMemo<Array<SettingEditFormType>>(() => {
    return [{
      name: 'Имя',
      fieldItem: {
        name: 'fullName' as const,
        placeholder: 'Full Name',
        type: 'text',
        component: InputField
      } as any,
      possibleInfo: PossibleInfo
    },
      {
        name: 'email',
        fieldItem: {
          name: 'email' as const,
          placeholder: 'Email',
          type: 'text',
          component: InputField
        } as any,
        possibleInfo: PossibleInfo
      },
      {
        name: 'Имя пользователя',
        fieldItem: {
          name: 'username' as const,
          placeholder: 'Username',
          type: 'text',
          component: InputField
        } as any,
        possibleInfo: PossibleInfo
      },
    ]
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
            { filedItems.map((item) => {
              const {component, ...inputProps} = item.fieldItem
              return (
                  <SettingsEditItem
                      key={ item.name }
                      inputProps={ inputProps }
                      InputComponent={ component }
                      PossibleInfo={ item.possibleInfo }
                      name={ item.name }/>
              )
            }) }
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
