import { Text } from '@/components/Typography/Text'
import styled from 'styled-components'

export const AvatarFieldWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
  min-width: 0;
`

export const ImageWrapper = styled.div`
  min-width: 5rem;
  border-radius: 50%;
  overflow: hidden;
  outline: none;
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
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
  border-radius: 50%;

  ${Text} {
    color: rgb(38, 38, 38, 0.5);
  }
`

export const Input = styled.input`
  display: none;
`

export const ChangeText = styled.p`
  color: rgb(0, 149, 246);
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
`

export const InfoWrapper = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  padding: 0.25rem 0;

  p,
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > ${Text} {
    font-size: 0.875rem;
  }
`
