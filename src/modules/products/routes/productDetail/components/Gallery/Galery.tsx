import { GetProductResponse } from '@/services/products/types'
import { ChevronBack } from '@styled-icons/ionicons-outline/ChevronBack'
import { ChevronForward } from '@styled-icons/ionicons-outline/ChevronForward'
import Image from 'next/legacy/image'
import React, { useState } from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
import * as Styled from './styles'

type Props = {
  product: GetProductResponse
}

function Gallery({ product: { images } }: Props) {
  const [slide, setSlide] = useState(0)

  const handleSlide = (cnt: number) => {
    setSlide(boundSlide(cnt))
  }

  const boundSlide = (cnt: number) => {
    if (images.length < cnt + 1) return 0
    else if (cnt < 0) return images.length - 1
    return cnt
  }

  return (
    <Styled.GalleryWrapper>
      <Styled.SliderWrapper>
        <Styled.Slider slide={slide}>
          {images.map(image => (
            <Styled.SliderItem key={image.id}>
              <Image
                loader={s3ImageLoader}
                alt="product-image"
                layout="fill"
                src={image.thumbnails[1280]}
              />
            </Styled.SliderItem>
          ))}
        </Styled.Slider>
        <Styled.SliderLeftButton onClick={() => handleSlide(slide - 1)}>
          <ChevronBack width={24} />
        </Styled.SliderLeftButton>
        <Styled.SliderRightButton onClick={() => handleSlide(slide + 1)}>
          <ChevronForward width={24} />
        </Styled.SliderRightButton>
      </Styled.SliderWrapper>

      <Styled.SliderImagesWrapper slide={slide}>
        {images.map((image, ind) => (
          <Styled.SliderImage key={image.id} onClick={() => handleSlide(ind)}>
            <Image
              loader={s3ImageLoader}
              alt="product-image"
              layout="fill"
              src={image.thumbnails[1280]}
            />
          </Styled.SliderImage>
        ))}
      </Styled.SliderImagesWrapper>
    </Styled.GalleryWrapper>
  )
}

export default Gallery
