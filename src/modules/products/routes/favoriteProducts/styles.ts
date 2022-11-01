import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const FavoriteProductsWrapper = styled.div`
  @media ${getMq('tablet', null)} {
    padding: 1.5rem 2rem;
  }

  & > ${Title} {
    padding: 1rem;
  }
`
