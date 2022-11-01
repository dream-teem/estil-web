import React from 'react'
import * as Styled from './styles'

type Props = {
  color?: string
  /**
   * percentage from 0 to 1
   */
  progress: number
  className: string
}

function ProgressBar({ color, progress, className }: Props) {
  return (
    <Styled.ProgressWrapper className={className}>
      <Styled.ProgressSlider color={color} progress={progress} />
    </Styled.ProgressWrapper>
  )
}

export default ProgressBar
