import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductInfoWrapper = styled.div`
  width: 100%;
  padding-top: 0.5rem;

  @media ${getMq('tablet', null)} {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`

export const SellerInfoWrapper = styled.div`
  display: block;
  order: 1;
  background-color: ${({ theme }) => theme.palette.background.paper};

  @media ${getMq('tablet', null)} {
    top: 60px;
    padding-bottom: 1.5rem;
  }
`
