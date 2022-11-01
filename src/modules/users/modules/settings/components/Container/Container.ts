import { getMq } from '@/styles'
import styled from 'styled-components'

export const ProfileSettingsContainer = styled.div`
  max-width: 100%;
  width: 375px;
  margin: auto;
  padding: 0.5rem 1rem;

  @media ${getMq('laptop', null)} {
    padding: 1rem 0;
  }
`
