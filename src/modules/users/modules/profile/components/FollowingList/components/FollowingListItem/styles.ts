import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import styled from 'styled-components'

export const UserImageWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
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

export const FollowingListItemWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  min-width: 0;
  cursor: pointer;
`
