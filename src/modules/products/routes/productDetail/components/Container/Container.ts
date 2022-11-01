import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductDetailContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: block;
  padding-bottom: 5rem;

  @media ${getMq('tablet', null)} {
    padding: 1.5rem 1rem 3rem 1rem;
    display: grid;
    grid-template-columns: minmax(300px, 640px) 375px;
    gap: 35px;
  }
`
