import { Text } from '@/components/Typography/Text'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProfileDescriptionWrapper = styled.div`
  width: 100%;
  max-width: 19rem;
  & > ${Text} {
    font-size: 0.875rem;
    overflow-wrap: break-word;
    white-space: pre-line;
  }

  @media ${getMq('tablet', null)} {
    max-width: 25rem;
    & > ${Text} {
      font-size: 0.925rem;
    }
  }
`
