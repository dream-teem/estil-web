import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import styled from 'styled-components'

export const AuthContainer = styled.div`
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
  max-width: 100%;
  width: 375px;

  ${Title} {
    text-align: center;
  }

  ${Text} {
    text-align: center;
    margin: 8px;
  }
`
