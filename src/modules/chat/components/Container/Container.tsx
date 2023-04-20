import { HEADER_HEIGHT } from '@/constants/layout'
import styled from 'styled-components'

export const ChatContainer = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 100%;
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
`
