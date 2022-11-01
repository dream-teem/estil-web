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
  flex: 1 1 auto;
`

export const SelectItem = styled.div`
  width: 100%;
  display: flex;
  padding: 0.75rem 0.225rem;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  min-width: 0;
  border-bottom: 1px solid rgba(60, 72, 88, 0.38);

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
  max-height: 400px;
  overflow: auto;
`

export const DropdownWrapper = styled.div`
  padding: 0 1rem;
  padding-top: 1rem;
  height: 100%;
`
