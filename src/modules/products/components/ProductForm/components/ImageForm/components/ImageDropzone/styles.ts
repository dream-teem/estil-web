import { Text } from '@/components/Typography/Text'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const DropzoneFillEmpty = styled.div`
  width: 100%;
  padding-top: 50%;

  @media ${getMq('mobileM', null)} {
    padding-top: 33.3333333%;
  }

  @media ${getMq('tablet', null)} {
    padding-top: 25%;
  }

  @media ${getMq('laptop', null)} {
    padding-top: 20%;
  }
`

export const DropzoneItem = styled.div`
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DropzoneIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  border: 1px ${({ theme }) => theme.palette.background.disabled} dashed;
  color: rgb(38, 38, 38, 0.5);
  border-radius: 0.25rem;
  flex-direction: column;
  cursor: pointer;

  ${Text} {
    display: none;
    color: rgb(38, 38, 38, 0.5);
  }

  @media ${getMq('tablet', null)} {
    ${Text} {
      display: block;
    }
  }
`

export const DropzoneWrapper = styled.div`
  width: 100%;
`

export const DropzoneInput = styled.input`
  display: none;
`

export const DropzoneOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255);
  justify-content: center;
  align-items: center;
  display: flex;

  ${Text} {
    color: rgba(153, 153, 153);
  }
`

export const DropzoneGrid = styled.div`
  width: 100%;
  display: flex;
  column-gap: 0.25rem;
`

export const Dropzone = styled.div`
  width: 100%;
  border-radius: 0.25rem;
  position: relative;
`

export const ErrorMessage = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.danger};
  height: 24px;

  &:empty {
    display: none;
  }
`
