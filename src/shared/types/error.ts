export type ValidationError<T> = {
  target?: T
  property?: keyof T
  constraints: Record<string, string>
  children: ValidationError<T[keyof T]>[]
}

export type ValidationErrorResponse<T = any> = {
  message: string
  errors: ValidationError<T>[]
}
