import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductDetailContentWrapper = styled.div`
  display: block;
  padding-top: 0px;

  @media ${getMq('tablet', null)} {
    padding: 1.5rem 0px 3rem;
    display: grid;
    grid-template-columns: minmax(300px, 640px) 375px;
    gap: 35px;
  }
`

export const SellerInfoWrapper = styled.div`
  @media ${getMq('tablet', null)} {
    display: none;
  }
`
