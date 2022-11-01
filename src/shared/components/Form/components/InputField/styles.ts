import { getMq } from '@/styles'
import styled, { css } from 'styled-components'
import { InputFieldProps } from './InputField'

export const InputOutlined = css({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '0.25rem'
})

export const InputNoBorder = css({
  border: 'none'
})
export const LabelFloating = css({
  transform: 'translate(0.225rem, -3px) scale(0.75)',
  transformOrigin: 'top left'
})

export const InputField = styled.input`
  width: 100%;
  font-size: 0.9rem;
  line-height: 1.5;
  border: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.75rem 0.225rem;
  outline: 0;
  flex: 1;

  textarea& {
    resize: none;
    overflow: hidden;
    min-height: 7.25rem;
    overflow-y: auto;
  }

  &::placeholder {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.text.disabled};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media ${getMq('tablet', null)} {
    font-size: 1rem;
    line-height: 1.5;

    &::placeholder {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
`

export const ErrorMessage = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.danger};
  height: 24px;

  &:empty {
    display: none;
  }
`

export const InputWrapper = styled.div`
  border-color: ${({ theme }) => theme.palette.text.disabled};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  transition: border-color 0.15s ease-in-out;
`

export const Label = styled.label`
  position: absolute;
  transform: translate(0.225rem, 0.75rem);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
  transition: all 0.1s ease-in-out;
  color: ${({ theme }) => theme.palette.text.disabled};
  user-select: none;
  pointer-events: none;

  &:empty {
    display: none;
  }
`

export const InputAdornment = styled.div`
  flex: 0;
  padding-right: 0.5rem;
  margin: auto 0 auto 0;
  color: ${({ theme }) => theme.palette.text.disabled};
  font-size: 0.9rem;

  @media ${getMq('tablet', null)} {
    font-size: 1rem;
    line-height: 1.5;
  }

  &:empty {
    display: none;
  }
`

type Props = {
  error: boolean
  isFocused: boolean
  variant: InputFieldProps['variant']
  multiline?: boolean
  adornment: boolean
  labelFloating?: boolean
  textAlignment: InputFieldProps['textAlignment']
}

export const TextFieldWrapper = styled.div<Props>`
  ${InputWrapper} {
    ${({ error, theme: { palette } }) =>
      error &&
      css({
        borderColor: `${palette.background.danger} !important`
      })}

    ${({ variant }) => variant === 'outlined' && InputOutlined}
      
    ${({ variant }) => variant === 'no-border' && InputNoBorder}

    ${({ isFocused, theme }) =>
      isFocused && css({ borderColor: `${theme.palette.text.primary}` })}
  }

  ${Label} {
    ${({ labelFloating }) => labelFloating && LabelFloating}
    ${({ variant }) => variant === 'outlined' && css({ display: 'none' })}
  }

  ${Label}:not(:empty) + ${InputWrapper} ${InputField}::placeholder {
    ${({ isFocused, adornment }) =>
      !adornment && !isFocused && css({ color: 'transparent' })}
  }

  ${InputField} {
    text-align: ${({ textAlignment }) => textAlignment};
  }
`
