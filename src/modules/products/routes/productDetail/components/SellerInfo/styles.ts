import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import styled, { css } from 'styled-components'

export const UserImageWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const UserDetailsWrapper = styled.div`
  min-width: 0;
  margin-left: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25rem 0;

  ${Text}, ${Title} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${Text} {
    font-size: 0.75rem;
  }

  ${Title} {
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

type Props = {
  variant?: 's' | 'm' | 'l'
}
export const UserInfoWrapper = styled.div<Props>`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  min-width: 0;

  ${UserImageWrapper} {
    ${({ variant = 's' }) =>
      variant === 'm' &&
      css({
        width: '3.5rem',
        height: '3.5rem'
      })}
  }

  ${UserImageWrapper} {
    ${({ variant = 's' }) =>
      variant === 'l' &&
      css({
        width: '4.5rem',
        height: '4.5rem'
      })}
  }
`
