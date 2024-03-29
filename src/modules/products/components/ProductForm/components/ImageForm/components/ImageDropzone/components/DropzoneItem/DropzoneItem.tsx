import { ProductImage } from '@/modules/products/types'
import { Close } from '@styled-icons/ionicons-outline/Close'
import Image from 'next/legacy/image'
import React from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
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
        loader={s3ImageLoader}
        src={image.thumbnails[310]}
        objectFit="cover"
        layout="fill"
      />
    </Styled.DropzoneImageWrapper>
  )
}

export default DropzoneItem
