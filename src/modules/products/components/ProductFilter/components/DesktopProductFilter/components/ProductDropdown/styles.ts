import { Text } from '@/components/Typography/Text'
import styled, { css } from 'styled-components'

export const ProductDropdownWrapper = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-bottom: 0.5rem;
  margin-right: 1rem;

  & > .dropdown-icon {
    margin-left: 0.25rem;
  }

  & > ${Text} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    font-size: 0.875rem;
  }
`

type Props = {
  position?: 'left' | 'right'
}

export const DropdownContentWrapper = styled.div<Props>`
  position: absolute;
  top: 100%;
  padding: 0 1rem;
  overflow: auto;
  max-height: 25rem;
  width: 20rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 1.25rem 0px;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 0.125rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: 1;
  ${({ position = 'right' }) =>
    css(position === 'right' ? { left: 0 } : { right: 0 })}
`
