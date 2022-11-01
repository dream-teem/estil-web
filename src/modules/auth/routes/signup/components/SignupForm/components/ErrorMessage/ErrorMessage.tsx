import styled from 'styled-components'

export const ErrorMessage = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.text.danger};
  margin-bottom: 0.5rem;
  font-size: 1rem;
`
