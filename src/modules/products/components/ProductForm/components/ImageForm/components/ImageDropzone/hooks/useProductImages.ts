import { ProductImage } from '@/modules/products/types'
import productApi from '@/services/products/api'
import { defaults } from 'lodash'
import assign from 'lodash/assign'
import range from 'lodash/range'
import zipWith from 'lodash/zipWith'
import { useMemo, useRef, useState } from 'react'
import { DropzoneImage } from '../types'

export type ProductImagesState = {
  images: DropzoneImage[]
}

export const useProductImages = (
  productImages: ProductImage[],
  onChange?: (images: ProductImage[]) => void
) => {
  const [uploadImage] = productApi.endpoints.saveImage.useMutation()

  const initialImages = useMemo(() => {
    const MAX_IMAGES = 4
    const images: DropzoneImage[] = range(1, MAX_IMAGES + 1).map(id => ({
      id,
      isLoading: false,
      image: null
    }))

    return zipWith(images, productImages, (item, image) => {
      return defaults({ image }, item)
    })
  }, [productImages])

  const [images, setImages] = useState<DropzoneImage[]>(initialImages)
  const imagesRef = useRef<DropzoneImage[]>(initialImages)

  const setImage = (id: number, data: Partial<Omit<DropzoneImage, 'id'>>) => {
    const ind = imagesRef.current.findIndex(image => image.id === id)
    if (ind >= 0) {
      assign(imagesRef.current[ind], data)
      setImages([...imagesRef.current])
    }
  }

  const saveImage = async (id: number, file: File) => {
    setImage(id, { isLoading: true })
    // generate unique id to show loading image upload for this image
    const image = await uploadImage(file)
      .unwrap()
      .catch(err => {
        setImage(id, { isLoading: false })
        throw err
      })

    setImage(id, { image, isLoading: false })
  }

  const saveImages = async (files: File[]) => {
    const emptyImages = images.filter(({ image }) => image === null)
    if (emptyImages.length < files.length) {
      console.log(
        'Validation error: maximum files exceeded, uploading only part'
      )
    }
    await Promise.all(
      zipWith(emptyImages, files, (image, file) => {
        if (image && file) {
          return saveImage(image.id, file)
        }
        return null
      }).filter(el => el !== null)
    )
    onChange?.(getProductImages())
  }

  const getProductImages = (): ProductImage[] => {
    return images
      .map(({ image }) => image)
      .filter(image => image !== null) as ProductImage[]
  }

  const removeImage = (id: number) => {
    setImage(id, { image: null })
    onChange?.(getProductImages())
  }

  return { removeImage, saveImage, saveImages, images }
}
