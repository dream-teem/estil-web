import { Text } from '@/components/Typography/Text'
import { Close } from '@styled-icons/ionicons-outline/Close'
import React from 'react'
import * as Styled from './styles'

type Props = {
  onClick?: () => void
  title: string
}

function ActiveFilterTag({ title, onClick }: Props) {
  return (
    <Styled.ActiveFilterTagWrapper onClick={onClick}>
      <Text>{title}</Text>
      <Close width={18} />
    </Styled.ActiveFilterTagWrapper>
  )
}

export default ActiveFilterTag
