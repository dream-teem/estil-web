import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.05rem;
  overflow: auto;

  ${Title} {
    display: none;
  }

  @media ${getMq('tablet', null)} {
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    ${Title} {
      display: block;
    }
  }

  @media ${getMq('laptop', null)} {
    grid-gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
  }
`

export const ProductWrapper = styled.div`
  cursor: pointer;
  user-select: none;
`

export const ProductImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
`
