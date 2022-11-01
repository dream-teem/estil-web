import React from 'react'
import CollapsableDropdownItem from './components/CollapsableDropdownItem/CollapsableDropdownItem'
import DropdownItem from './components/DropdownItem/DropdownItem'
import * as Styled from './styles'

type Props = {
  children: React.ReactNode
  className?: string
}

function Dropdown({ children, className }: Props) {
  return (
    <Styled.DropdownWrapper className={className}>
      {children}
    </Styled.DropdownWrapper>
  )
}

Dropdown.Item = DropdownItem
Dropdown.CollapsibleItem = CollapsableDropdownItem

export default Dropdown
