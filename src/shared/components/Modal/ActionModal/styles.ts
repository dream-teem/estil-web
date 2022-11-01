import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;

  .action-button {
    width: 100%;
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`

export const ActionModalContent = styled.div`
  width: 100%;
  padding: 1rem;

  & > ${Text} {
    padding-bottom: 2rem;
  }
`
