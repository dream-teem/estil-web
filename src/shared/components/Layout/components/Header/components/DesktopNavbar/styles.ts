import { getMq } from '@/styles'
import styled from 'styled-components'

export const DesktopNavbarWrapper = styled.div`
  display: none;
  height: 3rem;
  @media ${getMq('tablet', null)} {
    width: 100%;
    display: flex;
    flex-wrap: no-wrap;
    padding: 0 1rem;
  }
`
