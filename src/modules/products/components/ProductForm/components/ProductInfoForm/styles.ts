import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const FieldRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.25rem;
  & > ${Text} {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 0.5rem;
    width: min(150px, 50%);
  }
`

export const ErrorMessage = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.danger};
  height: 24px;

  &:empty {
    display: none;
  }
`

export const FieldColumn = styled.div``
