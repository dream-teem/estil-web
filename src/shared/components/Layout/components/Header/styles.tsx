import { HEADER_HEIGHT } from '@/constants/layout'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const Header = styled.header`
  background-color: white;
  width: 100%;
  top: 0;

  @media ${getMq('mobileL', null)} {
    position: sticky;
    z-index: 10000;
  }
`

export const LogoWrapper = styled.div`
  cursor: pointer;
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`

export const WidgetsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${IconWrapper}:not(:first-child) {
    margin-left: 1rem;
  }

  .login-button {
    margin-left: 1rem;
  }
`

export const HeaderWrapper = styled.div`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-row: row;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 0.0625rem solid rgb(215, 215, 215);
  padding: 0.75rem 1rem;

  ${IconWrapper}.menu-icon {
    margin-right: 0.5rem;
  }

  @media ${getMq(null, 'mobileM')} {
    ${IconWrapper}.like-icon {
      display: none;
    }
  }

  @media ${getMq('laptop', null)} {
    ${IconWrapper}.search-icon {
      display: none;
    }
  }

  @media ${getMq('tablet', null)} {
    padding: 0.75rem 2rem;

    ${IconWrapper}.menu-icon {
      display: none;
    }
  }

  @media ${getMq(null, 'mobileL')} {
    ${WidgetsWrapper} {
      margin-left: auto;
    }
  }
`

export const SearchBarOuter = styled.div`
  width: 35rem;
  display: none;

  @media ${getMq('laptop', null)} {
    display: block;
  }

  @media ${getMq('laptopL', null)} {
    width: 44rem;
  }
`

export const ModalContentWrapper = styled.div`
  padding: 0 0.5rem;
`
