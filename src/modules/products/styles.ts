import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductListWrapper = styled.div`
  width: 100%;
  overflow: auto;
`

export const ProductWrapper = styled.div`
  @media ${getMq('tablet', null)} {
    padding: 0 2rem;
  }
`
