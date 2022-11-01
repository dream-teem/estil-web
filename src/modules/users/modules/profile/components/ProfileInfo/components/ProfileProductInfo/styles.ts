import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const ProductInfoWrapper = styled.div`
  width: 100%;
  display: flex;
`

export const ProductInfo = styled.div`
  display: flex;
  flex: nowrap;
  align-items: center;
  color: rgb(41, 96, 175);
  margin-right: 0.5rem;
  ${Text} {
    color: #747474;
    margin-left: 0.25rem;
  }
`
