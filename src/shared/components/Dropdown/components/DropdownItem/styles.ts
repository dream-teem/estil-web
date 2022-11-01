import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const DropdownItem = styled.div`
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 0.75rem 0;

  & > ${Text} {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    font-size: 0.9rem;
  }
`
