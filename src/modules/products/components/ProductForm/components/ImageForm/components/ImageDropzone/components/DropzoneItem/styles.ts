import { getMq } from '@/styles'
import styled, { css } from 'styled-components'

export const DropzoneImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  overflow: hidden;
  outline: none;
  position: relative;
`

type ButtonProps = {
  position?: 'top' | 'bottom'
}

export const DropzoneButton = styled.span<ButtonProps>`
  width: 2.125rem;
  height: 2.125rem;
  background-color: #ffffff;
  border-color: #ffffff;
  position: absolute;
  border-radius: 0.25rem;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ position = 'top' }) =>
    css(
      position === 'top'
        ? { top: '0.225rem', right: '0.225rem' }
        : { bottom: '0.225rem', right: '0.625rem' }
    )}

  @media ${getMq('mobileL', null)} {
    ${({ position = 'top' }) =>
      css(
        position === 'top'
          ? { top: '0.625rem', right: '0.625rem' }
          : { bottom: '0.625rem', right: '0.625rem' }
      )}
  }
`
