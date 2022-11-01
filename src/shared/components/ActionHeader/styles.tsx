import styled from 'styled-components'
import { Title } from '../Typography/Title'

const HEADER_HEIGHT = '3.5rem'

export const ActionHeader = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  ${Title} {
    flex: 1;
    text-align: center;
  }
`

export const ActionHeaderButton = styled.div`
  height: ${HEADER_HEIGHT};
  width: ${HEADER_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
