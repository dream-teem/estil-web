import styled from 'styled-components'

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 0;
`

export const SelectButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SelectTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;
  text-align: end;
  flex: 1 1 auto;
`

export const SelectItem = styled.div`
  width: 100%;
  max-width: 20rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 0.75rem 0;
  position: relative;
  min-width: 0;

  ${SelectButtonWrapper}, ${SelectTitle} {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
`

export const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-height: 400px;
`

export const DropdownWrapper = styled.div`
  overflow: auto;
  height: 100%;
  padding: 0 1rem;
`

export const ActionWrapper = styled.div`
  height: 100%;
  padding: 0.5rem 1rem;

  .save-button {
    width: 100%;
  }
`
