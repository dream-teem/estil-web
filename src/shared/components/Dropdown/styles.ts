import styled from 'styled-components'

export const DropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.palette.background.paper};
`
