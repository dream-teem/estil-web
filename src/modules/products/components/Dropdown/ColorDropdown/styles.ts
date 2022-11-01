import styled, { css } from 'styled-components'

export const ColorSelectWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 0.8rem;
  position: relative;
`

type Props = {
  hex: string
  active: boolean
  borderHex: string | null
}

export const ColorCircle = styled.div<Props>`
  width: 40%;
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  cursor: pointer;
  background: ${({ hex }) => hex};
  border-radius: 100%;
  background-clip: content-box;
  margin-bottom: 0.8rem;

  ${({ borderHex }) =>
    borderHex &&
    css({
      outline: `1px solid ${borderHex}`
    })}
  ${({ hex, borderHex, active }) =>
    active &&
    css({
      border: `2px solid ${borderHex || hex}`,
      padding: '0.2rem',
      outline: 'none'
    })}
`

export const ColorItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
`
