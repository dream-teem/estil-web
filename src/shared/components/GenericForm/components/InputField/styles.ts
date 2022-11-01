import { getMq } from '@/styles'
import styled from 'styled-components'

export const InputFieldOuterWrapper = styled.div`
  width: 100%;
`

export const InputFieldInnerWrapper = styled.div`
  position: relative;
  line-height: 3rem;

  @media ${getMq('tablet', null)} {
    line-height: 2.5rem;
  }
`

export const InputFieldLabel = styled.label`
  position: absolute;
  z-index: 1;
  color: rgb(175, 175, 175);
  cursor: text;
  font-size: 0.875rem;
  left: 0.5rem;
  top: 0;
  pointer-events: none;
  transform-origin: 0px center;
  transition: transform 0.2s ease-in-out 0s;
`

type InputProps = { error?: string }

export const InputWrapper = styled.div`
  position: relative;
`

export const InputButton = styled.button`
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  right: 10px;
  z-index: 1;
  cursor: pointer;
  background-color: transparent;
  border: 0px;
`

export const Input = styled.input<InputProps>`
  height: 3rem;
  padding: 0.875rem 0.5rem 0;
  font-size: 1rem;
  border-radius: 0.125rem;
  border: 1px solid
    ${({ error, theme }) =>
      error ? theme.palette.text.danger : 'rgb(116, 116, 116);'};
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  box-shadow: none;
  appearance: none;

  @media ${getMq('tablet', null)} {
    padding: 0.625rem 0.5rem 0;
    font-size: 0.875rem;
    height: 2.5rem;
  }

  &:focus-visible {
    outline-offset: 0px;
  }

  &:focus {
    outline: 0;
    border-color: rgb(61, 55, 189);
  }

  &:-webkit-autofill
    + ${InputFieldLabel},
    &:focus
    + ${InputFieldLabel},
    &:not(:placeholder-shown)
    + ${InputFieldLabel} {
    transform: translate3d(0px, -8px, 0px) scale(0.7);
  }
`

export const InputFieldErrorWrapper = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.text.danger};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

export const InputFieldHelper = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.disabled};
`
