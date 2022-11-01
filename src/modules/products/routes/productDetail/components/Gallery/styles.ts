import { getMq } from '@/styles'
import styled, { css } from 'styled-components'

export const GalleryWrapper = styled.div`
  margin: 0rem -1rem;

  @media ${getMq('tablet', null)} {
    margin: 0;
  }
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media ${getMq('tablet', null)} {
    display: none;
  }
`

export const SliderItem = styled.div`
  min-width: 100%;
  width: 100%;
  position: relative;
  padding-top: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  user-select: none;
`

export const SliderLeftButton = styled.button`
  border-radius: 50%;
  position: absolute;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 50%;
  left: 2.5%;
  cursor: pointer;
  border: none;
  transform: translateY(-50%);
`

export const SliderRightButton = styled(SliderLeftButton)`
  left: unset;
  right: 2.5%;
`

export const SliderImage = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  width: 100%;
  max-width: 33.33%;
  @media ${getMq('tablet', null)} {
    max-width: 100%;
  }
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`

type SliderImagesProps = {
  slide?: number
}

export const SliderImagesWrapper = styled.div<SliderImagesProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 0.2rem;

  ${SliderImage}:not(:last-child) {
    margin-right: 0.2rem;
  }

  ${SliderImage}:nth-child(${({ slide = 0 }) => slide + 1}) {
    outline: 1px solid black;
  }

  @media ${getMq('tablet', null)} {
    flex-direction: column;
    pointer-events: none;
    align-items: center;
    ${SliderImage} {
      outline: 0 !important;
      margin-bottom: 0.5rem;
    }
  }
`

type SliderProps = {
  slide?: number
}

export const Slider = styled.div<SliderProps>`
  display: flex;
  transition: transform 0.2s ease-in 0s;
  width: 100%;
  ${({ slide = 0 }) =>
    css({
      transform: `translateX(calc(-${slide * 100}%))`
    })}
`
