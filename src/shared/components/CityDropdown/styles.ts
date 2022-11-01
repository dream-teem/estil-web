import styled from 'styled-components'

export const DropdownHeader = styled.div`
  flex: 0 1 auto;
  width: 100%;
  background: ${({ theme }) => theme.palette.background.paper};
`
export const CityDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;

  .not-found-text {
    margin: 1rem 0;
  }
`
export const CityDropdownContent = styled.div`
  height: 100%;
  overflow-y: auto;
  flex: 1 1 auto;
`
