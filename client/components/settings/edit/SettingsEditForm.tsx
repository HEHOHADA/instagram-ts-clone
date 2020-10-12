import React from 'react'
import { Form, Formik } from 'formik'

export const SettingsEditForm = () => {
  return (
      <Formik
          validateOnBlur={ false }
          validateOnChange={ false }
          initialValues={ {} }
          onSubmit={ () => {
          } }
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
