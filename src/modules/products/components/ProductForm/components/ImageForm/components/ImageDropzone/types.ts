import { ProductImage } from '@/modules/products/types'

export type DropzoneImage = {
  id: number
  isLoading: boolean
  image: ProductImage | null
}
