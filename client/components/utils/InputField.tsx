import React, { DetailedHTMLProps } from 'react'
import { FieldProps } from 'formik'

type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputField = ({field, form: {errors, touched}, ...props}: FieldProps & InputProps) => {

  const errorMessage = touched[field.name] && errors[field.name]

  return (
      <div className="form__group">
        { errorMessage && <div className="form__validation-error">{ errorMessage }</div> }
        <input
            { ...field }{ ...props }
            className="form__field"
            placeholder={ props.placeholder }
            name={ props.name }
            id={ props.id }
            required/>
        <label htmlFor={ props.id } className="form__label">{ props.placeholder }</label>
      </div>

  )
}
