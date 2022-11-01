import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import styled from 'styled-components'

export const LikeTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;

  margin: 0.5rem 0;
  & > ${Title} {
    font-size: 0.8rem;
    margin-right: 0.25rem;
  }
  & > ${Text} {
    font-size: 0.8rem;
  }
`

export const IconButtonWrapper = styled.div`
  cursor: pointer;
`

export const ProductInteractionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  order: 2;

  ${IconButtonWrapper}:not(:first-child):not(:last-child) {
    margin: 0 0.5rem;
  }
`
