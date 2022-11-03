import { ProductImage } from '@/modules/products/types'
import { Close } from '@styled-icons/ionicons-outline/Close'
import Image from 'next/image'
import React from 'react'
import * as Styled from './styles'

type Props = {
  image: ProductImage
  onRemove: () => void
}

function DropzoneItem({ image, onRemove }: Props) {
  return (
    <Styled.DropzoneImageWrapper>
      <Styled.DropzoneButton onClick={() => onRemove()}>
        <Close width={28} />
      </Styled.DropzoneButton>
      <Image
        alt="product-image"
        src={image.thumbnails[310]}
        style={{
          objectFit: 'cover'
        }}
      />
    </Styled.DropzoneImageWrapper>
  )
}

export default DropzoneItem
