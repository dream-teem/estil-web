import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductFormContainer = styled.div`
  margin: 0 auto;
  padding: 0.5rem;
  box-sizing: border-box;
  max-width: 960px;

  @media ${getMq('tablet', null)} {
    padding: 1rem;
  }
`
