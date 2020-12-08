import { FieldProps } from 'formik'
import React, { DetailedHTMLProps } from 'react'

type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputAuthField = ({field, form: {errors, touched}, className = 'form__group', ...props}: FieldProps & InputProps) => {

  const errorMessage = touched[field.name] && errors[field.name]

  return (
      <div className={ className }>
        { errorMessage && <div className="form__validation-error">{ errorMessage }</div> }
        <input
            { ...field }{ ...props }
            className="form__field"
            required/>
        <label htmlFor={ props.name } className="form__label">{ props.placeholder }</label>
      </div>

  )
}
