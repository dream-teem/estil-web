import { ValidationError, ValidationErrorResponse } from '@/types/error'
import every from 'lodash/every'
import has from 'lodash/has'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import values from 'lodash/values'

export const isValidationError = <T = any>(
  err: any
): err is ValidationErrorResponse<T> => {
  return (
    has(err, 'errors') &&
    isArray(err.errors) &&
    every(
      err.errors,
      err => has(err, 'constraints') && isObject(err.constraints)
    )
  )
}

export const formatValidationErrors = <T>(err: ValidationErrorResponse<T>) => {
  const { errors } = err
  return errors
    .filter(err => has(err, 'property'))
    .map(getErrors)
    .flat()
}

const getErrors = <T>({
  children,
  property,
  constraints
}: ValidationError<T>): CustomError[] => {
  if (isEmpty(children))
    return [{ property: property as string, message: values(constraints)[0] }]

  let errors: CustomError[] = []

  for (const childErr of children) errors.concat(getErrors(childErr))

  return errors
}

type CustomError = {
  property: string
  message: string
}
