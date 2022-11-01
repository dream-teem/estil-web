import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProfileContainer = styled.div`
  margin: auto;
  padding: 0.5rem 1rem;

  @media ${getMq('laptop', null)} {
    padding: 1rem;
  }
`

export const FollowingContainer = styled.div`
  margin: auto;
  max-width: 960px;

  & > ${Title} {
    padding: 1rem;
  }

  @media ${getMq('tablet', null)} {
    padding: 0 1rem;
  }
`
