import { entries } from 'lodash'
import React from 'react'
import InputField from '../InputField/InputField'
import SelectField from '../SelectField/SelectField'
import { countryCodes } from './contants'
import * as Styled from './styles'

type PhoneValue = {
  countryCode: keyof typeof countryCodes
  phone: string
}

type Props = {
  label?: string
  error?: string
  value?: PhoneValue
  helper?: string
  name?: string
  onChange?: (value: PhoneValue) => void
}

function PhoneInputField({ error, helper, onChange, value }: Props) {
  const phone = value?.phone || ''
  const countryCode = value?.countryCode || 'KZ'

  return (
    <Styled.InputFieldOuterWrapper>
      <Styled.PhoneFieldWrapper>
        <Styled.SelectWrapper>
          <Styled.SelectInputValue
            value={countryCodes[value?.countryCode || 'KZ'].code}
            readOnly
          />
          <SelectField
            classNames={{
              container: 'phone-select-container',
              select: 'phone-select'
            }}
            onChange={v =>
              onChange?.({
                phone,
                countryCode: (v as keyof typeof countryCodes) || 'KZ'
              })
            }
            value={countryCode}
            options={entries(countryCodes).map(([key, { code, name }]) => ({
              label: `${name} (${code})`,
              value: key
            }))}
          />
        </Styled.SelectWrapper>
        <InputField
          classNames={{
            input: 'phone-input'
          }}
          value={phone}
          onChange={v =>
            onChange?.({
              countryCode,
              phone: v || ''
            })
          }
          label="Номер телефона"
        />
      </Styled.PhoneFieldWrapper>

      {error && (
        <Styled.InputFieldErrorWrapper>{error}</Styled.InputFieldErrorWrapper>
      )}
      {helper && <Styled.InputFieldHelper>{helper}</Styled.InputFieldHelper>}
    </Styled.InputFieldOuterWrapper>
  )
}

export default PhoneInputField
