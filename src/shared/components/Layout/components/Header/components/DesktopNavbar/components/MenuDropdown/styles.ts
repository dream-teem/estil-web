import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const DropdownContentWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 1rem;
  overflow: auto;
  max-height: 20rem;
  width: 17rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 1.25rem 0px;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 0.125rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: 1;
  display: none;
`

export const DropdownWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 1rem;
  position: relative;

  & > ${Text} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    font-weight: bold;
  }

  &:hover {
    background-color: black;
    & > ${Text} {
      color: white;
    }

    ${DropdownContentWrapper} {
      display: block;
    }
  }
`
