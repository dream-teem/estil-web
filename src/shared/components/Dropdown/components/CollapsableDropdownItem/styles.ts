import styled from 'styled-components'

export const DropdownItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const DropdownContentWrapper = styled.div`
  width: 100%;
`

export const DropdownCollapse = styled.div`
  width: 100%;
  overflow: auto;

  ${DropdownContentWrapper} {
    padding-left: 1rem;
  }
`
