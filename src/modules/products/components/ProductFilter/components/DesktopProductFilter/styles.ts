import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProductFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`
export const ProductFilterOuterWrapper = styled.div`
  display: none;

  @media ${getMq('tablet', null)} {
    width: 100%;
    display: block;
  }
`

export const ProductFilterInnerWrapper = styled.div`
  max-width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
export const SortWrapper = styled.div`
  display: flex;
`
