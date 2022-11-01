import React, { ReactElement } from 'react'
import * as Styled from './styles'
type Props = {
  content: string | number | React.ReactNode
  children: ReactElement
}

function Badge({ content, children }: Props) {
  return (
    <Styled.ElementWrapper>
      {children}
      <Styled.BadgeWrapper>{content}</Styled.BadgeWrapper>
    </Styled.ElementWrapper>
  )
}

export default Badge
