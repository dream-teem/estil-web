import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { Text } from '@/components/Typography/Text'
import { ProductImage } from '@/modules/products/types'
import { Camera } from '@styled-icons/ionicons-outline/Camera'
import { useTranslation } from 'next-i18next'
import React from 'react'
import DropzoneItem from './components/DropzoneItem/DropzoneItem'
import { useDropzone } from './hooks/useDropzone'
import { useProductImages } from './hooks/useProductImages'
import * as Styled from './styles'
import { DropzoneImage } from './types'

type Props = {
  onChange: (images: ProductImage[]) => void
  images: ProductImage[]
  error?: string
}

function ImageDropzone({ onChange, images: productImages, error }: Props) {
  const { t } = useTranslation('product')
  const { removeImage, saveImages, images } = useProductImages(
    productImages,
    onChange
  )

  const {
    inputProps,
    wrapperProps: { onClick }
  } = useDropzone({ onChange: files => saveImages(files) })

  const DropzoneItemContent = (dropzoneImage: DropzoneImage) => {
    const { isLoading, image } = dropzoneImage
    if (isLoading) return <FillContainerLoader />
    if (image === null)
      return (
        <Styled.DropzoneIconWrapper onClick={onClick}>
          <Camera width={32} />
          <Text> {t('form.image.helper')} </Text>
        </Styled.DropzoneIconWrapper>
      )
    return (
      <DropzoneItem
        onRemove={() => removeImage(dropzoneImage.id)}
        image={image}
      />
    )
  }

  const DropzoneImageGrid = () => {
    return (
      <Styled.DropzoneGrid>
        {images.map(image => (
          <Styled.DropzoneItem key={image.id}>
            <DropzoneItemContent {...image} />
          </Styled.DropzoneItem>
        ))}
      </Styled.DropzoneGrid>
    )
  }

  return (
    <Styled.DropzoneWrapper>
      <Styled.Dropzone>
        <Styled.DropzoneInput
          {...inputProps}
          multiple
          type="file"
          accept="image/*"
        />
        <DropzoneImageGrid />
      </Styled.Dropzone>
      <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
    </Styled.DropzoneWrapper>
  )
}

export default ImageDropzone
