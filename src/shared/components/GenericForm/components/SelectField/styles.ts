import { getMq } from '@/styles'
import styled, { css } from 'styled-components'

export const SelectFieldOuterWrapper = styled.div`
  position: relative;

  @media ${getMq('tablet', null)} {
    line-height: 2.5rem;
  }
`

type SelectLabelProps = {
  floating?: boolean
}

export const SelectFieldLabel = styled.label<SelectLabelProps>`
  position: absolute;
  color: rgb(175, 175, 175);
  cursor: text;
  font-size: 0.875rem;
  left: 0.5rem;
  top: 0;
  pointer-events: none;
  transition: all 0.2s ease-in-out 0s;
  transform-origin: center left;

  ${({ floating }) =>
    floating &&
    css({
      transform: 'translate3d(0px, -8px, 0px) scale(0.7)'
    })};
`

export const SelectFieldInnerWrapper = styled.div`
  position: relative;
  line-height: 2.5rem;
`

export const Select = styled.select`
  height: 3rem;
  border-radius: 0.125rem;
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.625rem 0.5rem 0px;
  font-size: 0.875rem;
  border: 0.0625rem solid rgb(116, 116, 116);
  appearance: none;
  background: transparent;
  cursor: pointer;

  @media ${getMq('tablet', null)} {
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
    + ${SelectFieldLabel},
    &:focus
    + ${SelectFieldLabel},
    &:not(:placeholder-shown)
    + ${SelectFieldLabel} {
    transform: translate3d(0px, -8px, 0px) scale(0.7);
  }
`

export const SelectOption = styled.option``

export const SelectFieldErrorWrapper = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.text.danger};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
`

export const SelectFieldHelper = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.disabled};
`

export const SelectButton = styled.button`
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
  pointer-events: none;
`
