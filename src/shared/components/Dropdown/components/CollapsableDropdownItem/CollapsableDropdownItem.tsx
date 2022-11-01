import { ChevronDown } from '@styled-icons/ionicons-outline/ChevronDown'
import { ChevronForward } from '@styled-icons/ionicons-outline/ChevronForward'
import React, { useState } from 'react'
import DropdownItem, { DropdownItemProps } from '../DropdownItem/DropdownItem'
import * as Styled from './styles'

type Props = DropdownItemProps & {
  children?: React.ReactNode
}

function CollapsableDropdownItem({ title, children }: Props) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const Icon = () => {
    if (open) return <ChevronDown width={22} />
    return <ChevronForward width={22} />
  }

  return (
    <Styled.DropdownItemWrapper>
      <DropdownItem rightIcon={<Icon />} title={title} onClick={handleClick} />
      {open && (
        <Styled.DropdownCollapse>
          <Styled.DropdownContentWrapper>
            {children}
          </Styled.DropdownContentWrapper>
        </Styled.DropdownCollapse>
      )}
    </Styled.DropdownItemWrapper>
  )
}

export default CollapsableDropdownItem
