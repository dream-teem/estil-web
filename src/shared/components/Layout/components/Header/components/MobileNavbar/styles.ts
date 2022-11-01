import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled, { css } from 'styled-components'

type Props = {
  open?: boolean
}
export const MobileNavbarWrapper = styled.div<Props>`
  position: fixed;
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 3;
  width: 21.5rem;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.background.paper};
  transform: translateX(-100%);
  transition: 0.3s ease-in-out;

  ${({ open }) =>
    open &&
    css({
      transform: 'translateX(0)',
      boxShadow: 'rgb(0 0 0 / 20%) 8px 0px 48px'
    })}
  @media ${getMq('tablet', null)} {
    display: none;
  }
`

export const MobileMenuInner = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  width: 100%;
`

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MobileNav = styled.nav`
  padding-top: 1.5rem;
  & > ${Title} {
    padding-bottom: 1rem;
  }
`

export const MobileHeaderButton = styled.div`
  cursor: pointer;
`
