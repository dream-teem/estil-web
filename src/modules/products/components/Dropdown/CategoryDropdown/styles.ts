import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const DropdownHeader = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0.75rem 0;
  background-color: ${({ theme }) => theme.palette.background.paper};

  & > ${Text} {
    width: 100%;
    text-align: center;
  }
`

export const HeaderButton = styled.div`
  height: 100%;
  width: 3.5rem;
  display: flex;
  align-items: center;

  &:not(:empty) {
    cursor: pointer;
  }
`
export const CategoryDropdownWrapper = styled.div``
