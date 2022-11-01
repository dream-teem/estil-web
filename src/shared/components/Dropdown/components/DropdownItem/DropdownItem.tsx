import { Text } from '@/components/Typography/Text'
import React from 'react'
import * as Styled from './styles'

export type DropdownItemProps = {
  title: string | React.ReactNode
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  onClick?: () => void
}

function DropdownItem({
  title,
  rightIcon,
  leftIcon,
  onClick
}: DropdownItemProps) {
  return (
    <Styled.DropdownItem onClick={onClick}>
      {!rightIcon && leftIcon}
      <Text>{title}</Text>
      {rightIcon}
    </Styled.DropdownItem>
  )
}

export default DropdownItem
