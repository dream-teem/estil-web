import styled from 'styled-components'

const TEXT_VARIANTS = {
  s: '0.8rem',
  m: '1rem',
  l: '1.25rem'
}

type Props = {
  variant?: keyof typeof TEXT_VARIANTS
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none'
  color?: 'secondary' | 'danger' | 'primary' | 'disabled'
}

export const Text = styled.p<Props>`
  font-size: ${({ variant = 'm' }) => TEXT_VARIANTS[variant]};
  text-transform: ${({ transform = 'none' }) => transform};
  color: ${({ theme, color = 'primary' }) => theme.palette.text[color]};
  font-weight: normal;
`

export const SecondaryText = styled(Text)`
  color: ${({ theme }) => theme.palette.text.secondary};
`
