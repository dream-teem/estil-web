import { getMq } from '@/styles'
import styled from 'styled-components'

export const MobileMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const MobileMenuButton = styled.button`
  height: 2rem;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  line-height: 1;
  justify-content: center;
  width: 100%;
  padding: 0px;
  border: none;
  background-color: ${({ theme }) => theme.palette.background.paper};
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.palette.text.primary};

  .filter-icon {
    margin-right: 0.25rem;
  }

  .sort-dropdown {
    border: none;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    appearance: none;
    border-radius: 0px;
    padding-left: 0.1875rem;
    background: rgb(255, 255, 255);
  }

  label {
    position: absolute;
    z-index: 1;
    display: flex;
    line-height: 1;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    pointer-events: none;
    inset: 0.125rem 0.125rem 0.125rem 0.0625rem;
  }
`

export const MobileProductFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;

  ${MobileMenuWrapper}:first-child {
    border-right: 1px solid rgb(215, 215, 215);
    padding-right: 10px;
  }
  ${MobileMenuWrapper}:last-child {
    padding-left: 10px;
  }

  @media ${getMq('tablet', null)} {
    display: none;
  }
`

export const MobileFilterWrapper = styled.div`
  padding: 0 1rem;
`

export const MobileFilterCountWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  border: 1px solid rgb(38, 38, 38);
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.125rem;
  margin-left: 0.5rem;
`
