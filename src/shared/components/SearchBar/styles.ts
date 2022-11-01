import styled from 'styled-components'

export const SearchBarWrapper = styled.div`
  height: 2.5rem;
  width: 100%;
  border: 0.0625rem solid rgb(175, 175, 175);
  border-radius: 0.25rem;
  overflow: hidden;
  display: flex;
  align-items: center;

  .search-icon {
    margin: 0 0.5rem;
  }

  .arrow-button {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`

export const ClearButton = styled.button`
  font-size: 0.625rem;
  background-color: rgb(116, 116, 116);
  color: white;
  height: 1.5rem;
  min-width: 3rem;
  border-radius: 1.5rem;
  margin: 0 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;
`
export const SearchBarField = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
`

export const SearchBarDropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  z-index: 3;
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow-y: auto;
  max-height: 35rem;
`

export const SearchBarOuter = styled.div`
  position: relative;
`
