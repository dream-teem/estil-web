import { ValidationErrorResponse } from '@/types/error'
import _ from 'lodash'

export const isValidationError = <T = any>(
  err: any
): err is ValidationErrorResponse<T> => {
  return (
    _.has(err, 'errors') &&
    _.isArray(err.errors) &&
    _.every(
      err.errors,
      err => _.has(err, 'constraints') && _.isObject(err.constraints)
    )
  )
}
