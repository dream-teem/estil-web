import { ChevronDown } from '@styled-icons/ionicons-outline/ChevronDown'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import * as Styled from './styles'

type Props = {
  label?: string
  error?: string
  value?: string | number
  helper?: string
  registration?: Partial<UseFormRegisterReturn>
  name?: string
  options: {
    label: string | number
    value: string | number
    display?: string
  }[]
  onChange?: (val: string | number) => void
  classNames?: {
    select?: string
    container?: string
  }
}

function SelectField({
  label,
  error,
  helper,
  registration,
  options,
  name,
  onChange,
  classNames
}: Props) {
  return (
    <Styled.SelectFieldOuterWrapper className={classNames?.container}>
      <Styled.SelectFieldInnerWrapper>
        <Styled.Select
          name={name}
          onChange={({ target: { value } }) => onChange?.(value)}
          {...registration}
          className={classNames?.select}
        >
          {options.map(({ label: optionLabel, value, display }) => (
            <Styled.SelectOption
              key={`${label}-select-options-${value}`}
              value={value}
              label={display || String(optionLabel)}
              placeholder=" "
            >
              {optionLabel}
            </Styled.SelectOption>
          ))}
        </Styled.Select>
        <Styled.SelectFieldLabel>{label}</Styled.SelectFieldLabel>
        <Styled.SelectButton>
          <ChevronDown width={18} />
        </Styled.SelectButton>
      </Styled.SelectFieldInnerWrapper>
      {error && (
        <Styled.SelectFieldErrorWrapper>{error}</Styled.SelectFieldErrorWrapper>
      )}
      {helper && <Styled.SelectFieldHelper>{helper}</Styled.SelectFieldHelper>}
    </Styled.SelectFieldOuterWrapper>
  )
}

export default SelectField
