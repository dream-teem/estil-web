import { getMq } from '@/styles'
import styled, { css } from 'styled-components'

type Props = {
  fullWidth?: boolean
  color?: 'danger' | 'primary' | 'secondary' | 'disabled'
  variant?: 'normal' | 'outline'
}

export const Button = styled.button<Props>`
  border-radius: 0.125rem;
  background-color: ${({ theme, color = 'primary' }) =>
    theme.palette.button[color]};
  color: white;
  border: 0.125rem solid transparent;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '')};
  cursor: pointer;
  padding: 0.625rem 0.875rem;
  font-weight: bold;

  ${({ variant = 'normal' }) =>
    variant === 'outline' &&
    css({
      color: 'black',
      background: 'none',
      border: '0.125rem solid black'
    })}}

  
  &:disabled {
    background-color: ${({ theme }) => theme.palette.background.disabled};
  }

  @media ${getMq('tablet', null)} {
    padding: 0.625rem 2rem;
  }
`

export const AuthWrapper = styled.div``
