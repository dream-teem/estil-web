import { Title } from '@/components/Typography/Title'
import { getMq } from '@/styles'
import styled from 'styled-components'

export const AvatarWrapper = styled.div`
  min-height: 5rem;
  min-width: 5rem;
  max-height: 5rem;
  max-width: 5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${getMq('mobileL', null)} {
    min-height: 6rem;
    min-width: 6rem;
    max-height: 6rem;
    max-width: 6rem;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  padding: 0.225rem 0;
  margin-left: 1rem;

  @media ${getMq('mobileL', null)} {
    margin-left: 1.5rem;
    ${Title} {
      font-size: 1.25rem;
    }
  }

  @media ${getMq('tablet', null)} {
    ${Title} {
      font-size: 1.5rem;
    }
  }
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
`
