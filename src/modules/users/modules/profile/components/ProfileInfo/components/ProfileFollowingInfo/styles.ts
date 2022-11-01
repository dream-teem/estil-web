import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const FollowingInfoItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  ${Text}, ${Title} {
    font-size: 0.8rem;
  }

  @media ${getMq('mobileS', null)} {
    ${Text}, ${Title} {
      font-size: 0.875rem;
    }
  }

  @media ${getMq('tablet', null)} {
    flex-direction: row;
    ${Title} {
      margin-right: 0.5rem;
    }
  }
`

export const FollowButton = styled.button`
  background-color: rgb(41, 96, 175);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 0.25rem;
  border: none;
  font-weight: bold;
  cursor: pointer;

  @media ${getMq('tablet', null)} {
    padding: 0.625rem 2rem;
  }
`
export const ProfileFollowingInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${FollowingInfoItem}:not(:last-child) {
    margin-right: 1.5rem;
  }
`
