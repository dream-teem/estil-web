import styled, { css } from 'styled-components'

export type Props = {
  position?: 'top' | 'bottom'
}
export const BadgeWrapper = styled.div<Props>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  transform: scale(1) translate(50%, -50%);

  ${({ position = 'top' }) =>
    css(position === 'top' ? { top: 0 } : { bottom: 0 })}
`

export const ElementWrapper = styled.div`
  position: relative;
`
