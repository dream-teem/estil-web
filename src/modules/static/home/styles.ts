import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import styled from 'styled-components'

export const HomeWrapper = styled.div``

export const LandingImageWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  max-height: 100%;
`

export const HeroImage = styled.img`
  width: 100%;
  max-height: 100%;
  height: auto;
  filter: brightness(65%);
`

export const HeroContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > ${Title} {
    font-size: 2rem;
    color: white;
  }

  & > ${Text} {
    color: white;
    max-width: 80%;
    text-align: center;
  }

  .heroButton {
    width: 120px;
    border-color: white;
    color: white;
  }
`
