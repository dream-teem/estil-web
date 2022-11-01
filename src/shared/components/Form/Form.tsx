import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import * as React from 'react'
import {
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn
} from 'react-hook-form'
import { ZodType, ZodTypeDef } from 'zod'
import InputField from './components/InputField/InputField'
import * as Styled from './styles'
import { isValidationError } from './utils'

type FormProps<TFormValues, Schema> = {
  onSubmit: (
    methods: UseFormReturn<TFormValues, any>,
    handleErr: (err: any) => void
  ) => SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  options?: UseFormProps<TFormValues>
  id?: string
  schema?: Schema
}

function Form<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({ onSubmit, children, options, id, schema }: FormProps<TFormValues, Schema>) {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema)
  })

  const handleValidationError = (err: any) => {
    if (isValidationError<TFormValues>(err)) {
      const { errors } = err
      errors
        .filter(err => _.has(err, 'property'))
        .forEach(({ property, constraints }) => {
          _.entries(constraints).forEach(([key, message]) =>
            methods.setError(property as any, { message })
          )
        })
    }
    throw err
  }

  return (
    <Styled.Form
      onSubmit={methods.handleSubmit(onSubmit(methods, handleValidationError))}
      id={id}
    >
      {children(methods)}
    </Styled.Form>
  )
}

Form.InputField = InputField

export default Form
