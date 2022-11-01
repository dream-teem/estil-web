import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const ActiveFilterTagWrapper = styled.div`
  appearance: none;
  border: 1px solid black;
  padding: 0.25rem 0.625rem 0.25rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  & > ${Text} {
    font-size: 0.875rem;
    margin-right: 0.5rem;
  }
`
