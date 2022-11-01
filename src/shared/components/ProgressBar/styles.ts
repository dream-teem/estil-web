import styled from 'styled-components'

export const ProgressWrapper = styled.div`
  width: 100%;
  background-color: rgb(243, 243, 243);
  border-radius: 0.5rem;
  overflow: hidden;
  height: 0.625rem;
`

type Props = {
  color?: string
  progress: number
}
export const ProgressSlider = styled.div<Props>`
  background-color: ${({ theme, color }) =>
    color || theme.palette.background.danger};
  width: ${({ progress }) => progress * 100}%;
  height: 100%;
  border-radius: 0.5rem;
  transition: width 0.5s ease-out 0s;
`
