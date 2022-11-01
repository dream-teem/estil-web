import { getMq } from '@/styles'
import styled from 'styled-components'

export const PhoneFieldWrapper = styled.div`
  display: flex;

  .phone-input {
    border-left: none;
    border-radius: 0px 0.125rem 0.125rem 0px;
  }

  .phone-input:not(:focus) {
    border-color: rgb(175, 175, 175);
  }
`
export const InputFieldOuterWrapper = styled.div`
  width: 100%;
`

export const InputFieldInnerWrapper = styled.div`
  position: relative;
  line-height: 3rem;
  display: flex;
  @media ${getMq('tablet', null)} {
    line-height: 2.5rem;
  }
`

export const InputWrapper = styled.div`
  position: relative;
`

export const SelectWrapper = styled.div`
  position: relative;
  .phone-select {
    opacity: 0;
  }

  .phone-select-container {
    width: 5rem;
  }
`

export const SelectInputValue = styled.input`
  position: absolute;
  cursor: pointer;
  padding: 0.625rem;
  border-radius: 0.125rem 0px 0px 0.125rem;
  font-size: 0.875rem;
  z-index: -1;
  box-shadow: none;
  appearance: none;
  border: 0.0625rem solid rgb(38, 38, 38);
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  height: 3rem;
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
