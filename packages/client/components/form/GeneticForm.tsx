import React from 'react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useApolloClient } from '@apollo/client'
import { InputField } from '@/components/utils/InputField'

export type IFormItems<TVariables> = {
  [T in keyof TVariables]: IFormField<TVariables>
}

export interface IFormField<TVariables> {
  key?: string
  decoratorOption: any
  componentProps: any
  customValidator?: (
    form: FormikProps<TVariables>,
    value: any,
    callback: (err?: string) => void
  ) => void
}


export interface IGenericFormBaseProps<TVariables, TData> {
  submitBtnLabel: string
  fields: IFormItems<TVariables>
  fieldOrder: Array<keyof TVariables>
  transformValues?: (values: TVariables) => any
  loadingMessage: string
  mutationSchema: any
  onSuccess?: (data: TData) => void
}


export interface IGenericFormProps<TVariables, TData>
  extends IGenericFormBaseProps<TVariables, TData> {
}


const hasErrors = (fieldsError: { [x: string]: unknown }) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const GenericForm: <TVariables, TData>(
  p: IGenericFormProps<TVariables, TData>
) => React.ReactElement<IGenericFormProps<TVariables, TData>> = ({
                                                                   submitBtnLabel,
                                                                   fields,
                                                                   fieldOrder,
                                                                   transformValues,
                                                                   mutationSchema,
                                                                   onSuccess
                                                                 }) => {

  const apollo = useApolloClient()

  const handleSubmit = async (_: any, formikHelpers: FormikHelpers<any>) => {
    const {validateForm} = formikHelpers
    validateForm((values: any) => {
      const finalVars = transformValues ? transformValues(values) : values
      if (apollo.mutate) {
        try {
          apollo
            .mutate({
              mutation: mutationSchema,
              variables: finalVars,
            })
            .then(({data}) => {
              if (onSuccess) {
                onSuccess(data as any)
              }
            })

        } catch (error) {
        }
      }
    })
  }

  const initialValues = fieldOrder.reduce((acc, item) => {
    // @ts-ignore
    acc[item] = ''
    return acc
  }, {})

  return (
    <Formik<any>
      validateOnBlur={ false }
      validateOnChange={ false }
      initialValues={ initialValues }
      onSubmit={ handleSubmit }>
      { () => (
        <Form>
          { fieldOrder &&
          fieldOrder.map((key, index) => {
            const {
              decoratorOption: {rules},
              customValidator,
              componentProps,
              ...restFormItemProps
            } = fields[key]
            return (
              <Field
                name={ key }
                id={ key }
                { ...restFormItemProps } key={ index }
                { ...componentProps }
                component={ InputField }
              />
            )
          }) }
          <button
            type="submit"
            style={ {marginTop: 16} }
          >
            { submitBtnLabel }
          </button>
        </Form>
      )
      }
    </Formik>
  )
}

export default GenericForm
