import { FieldProps } from 'formik'
import React, { DetailedHTMLProps } from 'react'

type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputField = ({field, ...props}: FieldProps & InputProps) => {

  return (
      <input
          { ...field }{ ...props }
          className="create__title"
          required/>
  )
}
