import { IconButton } from '@/components/Elements/IconButton.tsx/IconButton'
import { Text } from '@/components/Typography/Text'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { ChevronDown } from '@styled-icons/ionicons-outline/ChevronDown'
import { ChevronUp } from '@styled-icons/ionicons-outline/ChevronUp'
import React, { useRef, useState } from 'react'
import * as Styled from './styles'

type Props = {
  children: React.ReactNode
  title: string
  position?: 'right' | 'left'
}

function ProductDropdown({ children, title, position }: Props) {
  const [open, setOpen] = useState(false)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  return (
    <Styled.ProductDropdownWrapper onClick={() => setOpen(!open)} ref={ref}>
      <Text>{title}</Text>
      <IconButton className="dropdown-icon">
        {open ? <ChevronUp width={18} /> : <ChevronDown width={18} />}
      </IconButton>
      {open && (
        <Styled.DropdownContentWrapper
          position={position}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </Styled.DropdownContentWrapper>
      )}
    </Styled.ProductDropdownWrapper>
  )
}

export default ProductDropdown
