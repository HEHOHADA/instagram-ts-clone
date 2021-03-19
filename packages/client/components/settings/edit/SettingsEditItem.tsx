import React, { FC } from 'react'

type PropsType = {
  name: string
  InputComponent: any
  inputProps: any
  PossibleInfo?: JSX.Element

}
export const SettingsEditItem: FC<PropsType> = ({
  name,
  InputComponent,
  inputProps,
  PossibleInfo
}) => {
  return (
    <div className='change__item__container'>
      <div className='change__name'>{ name }</div>
      <div className='change__input__container'>
        <InputComponent className='input__field' { ...inputProps } />
        { PossibleInfo }
      </div>
    </div>
  )
}
