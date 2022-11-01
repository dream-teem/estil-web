import React, { useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import * as Styled from './styles'

export type InputFieldProps = {
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
  error?: FieldError | undefined
  type?: 'text' | 'password' | 'email' | 'number'
  variant?: 'outlined' | 'standard' | 'no-border'
  label?: string
  adornment?: string
  multiline?: boolean
  name?: string
  textAlignment?: 'right' | 'left'
}

function InputField({
  type = 'text',
  variant = 'standard',
  placeholder,
  registration,
  error,
  label,
  multiline,
  adornment,
  name,
  textAlignment = 'left'
}: InputFieldProps) {
  const [inputState, setState] = useState({ focus: false, value: '' })

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ focus: true, value: e.target.value })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...inputState, value: e.target.value })
    registration.onChange?.(e)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...inputState, focus: false })
    registration.onBlur?.(e)
  }

  return (
    <Styled.TextFieldWrapper
      variant={variant}
      isFocused={inputState.focus}
      multiline={multiline}
      error={!!error}
      adornment={!!adornment}
      labelFloating={!!adornment || inputState.focus || !!inputState.value}
      textAlignment={textAlignment}
    >
      <Styled.Label>{label}</Styled.Label>
      <Styled.InputWrapper>
        <Styled.InputField
          name={name}
          as={multiline ? 'textarea' : 'input'}
          type={type}
          {...registration}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          placeholder={placeholder}
        />
        <Styled.InputAdornment>{adornment}</Styled.InputAdornment>
      </Styled.InputWrapper>
      <Styled.ErrorMessage>{error?.message}</Styled.ErrorMessage>
    </Styled.TextFieldWrapper>
  )
}

export default InputField
