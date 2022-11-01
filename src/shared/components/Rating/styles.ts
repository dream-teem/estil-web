import styled from 'styled-components'

export const RatingWrapper = styled.div`
  display: flex;
  flex: no-wrap;
  flex-direction: row;
`

export const RatingStarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items; center;
    user-select: none;
    color: ${({ theme }) => theme.palette.background.secondary};
`
