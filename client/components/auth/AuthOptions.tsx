import React from 'react'

const AuthOptions = () => {
  return (
      <>
        <div className="form__or__item">
          <div className="or__item__line"/>
          <div className="or__text">или</div>
          <div className="or__item__line"/>
        </div>

        <button className="auth__login__with">With something</button>
        <a className="auth__forgot__password">Забыли пароль</a>
      </>
  )
}


export default React.memo(AuthOptions)
