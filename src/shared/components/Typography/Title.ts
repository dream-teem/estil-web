import styled from 'styled-components'

const TEXT_VARIANTS = {
  s: '1rem',
  m: '1.125rem',
  l: '1.25rem'
}
type Props = {
  variant?: keyof typeof TEXT_VARIANTS
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none'
  color?: 'secondary' | 'danger' | 'primary'
}

export const Title = styled.h1<Props>`
  font-size: ${({ variant = 'm' }) => TEXT_VARIANTS[variant]};
  text-transform: ${({ transform = 'none' }) => transform};
  color: ${({ theme, color = 'primary' }) => theme.palette.text[color]};
`
export const SecondaryTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.text.secondary};
`
