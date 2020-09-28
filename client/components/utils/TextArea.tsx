import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'
import { FieldProps } from 'formik'


type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const TextArea: FC<FieldProps & TextAreaProps> = ({field,form:_, ...props}) => {
  return (
      <textarea
          { ...field }
          { ...props }/>
  )
}
