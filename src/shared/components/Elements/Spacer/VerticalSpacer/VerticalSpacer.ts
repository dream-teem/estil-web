import styled from 'styled-components'

const VARIANTS = {
  xs: '0.25rem',
  s: '0.5rem',
  m: '1rem',
  l: '1.5rem'
}
type Props = {
  variant?: keyof typeof VARIANTS
}
export const VerticalSpacer = styled.div<Props>`
  min-height: 1px;
  min-width: ${({ variant = 'm' }) => VARIANTS[variant]};
`
