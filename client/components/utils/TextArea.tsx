import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'
import { FieldProps } from 'formik'


type InputProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const TextArea: FC<FieldProps & InputProps> = ({field, ...props}) => {
  return (
      <textarea
          { ...field }
          { ...props }/>
  )
}
