import { Eye } from '@styled-icons/ionicons-outline/Eye'
import { EyeOff } from '@styled-icons/ionicons-outline/EyeOff'
import React, { ChangeEvent, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import * as Styled from './styles'

type Props = {
  label?: string
  error?: string
  value?: string
  helper?: string
  registration?: Partial<UseFormRegisterReturn>
  type?: 'text' | 'password' | 'email' | 'number'
  name?: string
  onChange?: (val: string) => void
  onBlur?: (val: string) => void
  autoComplete?: string
  classNames?: {
    input?: string
    container?: string
  }
}

function InputField({
  label,
  error,
  helper,
  type,
  value,
  registration,
  name,
  autoComplete = 'on',
  onChange,
  onBlur,
  classNames
}: Props) {
  const [inputState, setState] = useState({
    passwordShow: true
  })

  const PasswordIcon = () => {
    const togglePasswordIcon = () =>
      setState({ ...inputState, passwordShow: !inputState.passwordShow })
    if (inputState.passwordShow)
      return <Eye width={20} onClick={togglePasswordIcon} />
    return <EyeOff width={20} onClick={togglePasswordIcon} />
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value)
    registration?.onBlur?.(e)
  }

  const inputType =
    type === 'password' ? (inputState.passwordShow ? 'password' : 'text') : type

  return (
    <Styled.InputFieldOuterWrapper className={classNames?.container}>
      <Styled.InputFieldInnerWrapper>
        <Styled.Input
          placeholder=" " // used to style label when value is empty https://stackoverflow.com/questions/16952526/detect-if-an-input-has-text-in-it-using-css-on-a-page-i-am-visiting-and-do-no
          aria-invalid={error ? 'true' : 'false'}
          type={inputType}
          value={value}
          name={name}
          onChange={({ target: { value } }) => onChange?.(value)}
          {...registration}
          onBlur={handleBlur}
          className={classNames?.input}
          autoComplete={autoComplete}
        />
        <Styled.InputFieldLabel>{label}</Styled.InputFieldLabel>
        {type === 'password' && (
          <Styled.InputButton type="button">
            <PasswordIcon />
          </Styled.InputButton>
        )}
      </Styled.InputFieldInnerWrapper>
      {error && (
        <Styled.InputFieldErrorWrapper>{error}</Styled.InputFieldErrorWrapper>
      )}
      {helper && <Styled.InputFieldHelper>{helper}</Styled.InputFieldHelper>}
    </Styled.InputFieldOuterWrapper>
  )
}

export default InputField
