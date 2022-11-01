import React from 'react'
import { Title } from '../Typography/Title'
import * as Styled from './styles'

type Props = {
  title: string
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

function ActionHeader({ title, leftButton, rightButton }: Props) {
  return (
    <Styled.ActionHeader>
      <Styled.ActionHeaderButton>{leftButton}</Styled.ActionHeaderButton>
      <Title>{title}</Title>
      <Styled.ActionHeaderButton>{rightButton}</Styled.ActionHeaderButton>
    </Styled.ActionHeader>
  )
}

export default ActionHeader
