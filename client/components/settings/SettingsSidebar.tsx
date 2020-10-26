import React from 'react'

export const SettingsSidebar = () => {
  const array = [
    {name: 'Редактировать профиль'},
    {name: 'Сменить пароль'},
    {name: 'Push-уведомления'},
    {name: 'Входы в аккаунт'},
  ]
  return (
      <ul className="settings__side-bar">
        { array.map((n, i) => (
            <li key={ `sidebar_${ i }` }>
              <a className="side-bar__item">{ n.name }</a>
            </li>
        )) }
      </ul>
  )
}
