import { getMq } from '@/styles'
import styled from 'styled-components'

export const SearchBarOuter = styled.div`
  width: 35rem;

  @media ${getMq('laptopL', null)} {
    width: 44rem;
  }
`

export const ModalContentWrapper = styled.div`
  padding: 0.5rem;
`
