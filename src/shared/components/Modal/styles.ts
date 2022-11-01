import { getMq } from '@/styles'
import styled, { createGlobalStyle } from 'styled-components'

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: auto;
  user-select: normal;
  overflow: auto;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;

  @media ${getMq('tablet', null)} {
    min-width: 400px;
    width: max-content;
    height: max-content;
    max-width: 70%;
    max-height: 70%;
  }
`

export const ModalHeader = styled.div`
  width: 100%;
  height: 3.5rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.0625rem solid rgb(215, 215, 215);
  pointer-events: auto;
  background-color: ${({ theme }) => theme.palette.background.paper};
`

export const ModalTitle = styled.p`
  width: 100%;
  flex: 1;
  text-align: center;
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3.5rem;
  height: 100%;
  flex: 0;
`

export const ModalContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: auto;
  overflow: auto;
`

export const ModalBackdrop = styled.div`
  z-index: 100000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.48);
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  overflow: hidden;
`

export const RemoveScrollGlobalStyle = createGlobalStyle`
  body{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
  }
`

export const ModalFooter = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`
