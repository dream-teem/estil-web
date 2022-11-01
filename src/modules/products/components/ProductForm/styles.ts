import styled from 'styled-components'

export const Form = styled.form``

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
