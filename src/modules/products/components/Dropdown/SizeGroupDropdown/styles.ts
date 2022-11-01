import styled, { css } from 'styled-components'

export const SizeGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
type SizeProps = {
  active?: boolean
}

export const SizeItem = styled.div<SizeProps>`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  border: 1px solid rgb(175, 175, 175);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  cursor: pointer;
  text-align: center;
  border-radius: 0.25rem;
  user-select: none;

  ${({ active }) =>
    active &&
    css({
      border: '1px solid rgb(0, 0, 0)',
      background: 'black',
      color: 'white'
    })}
`

export const SizeGroupDropdownWrapper = styled.div``
