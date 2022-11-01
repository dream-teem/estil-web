import { useAuth } from '@/hooks/useAuth'
import productApi from '@/services/products/api'
import {
  CreateProductRequest,
  GetProductResponse
} from '@/services/products/types'
import { useRouter } from 'next/router'
import { FieldValues } from '../components/ProductForm/ProductForm'

export const useProduct = () => {
  const [createProduct, { isLoading: isLoadingProductCreate }] =
    productApi.endpoints.create.useMutation()
  const [updateProduct, { isLoading: isLoadingProductUpdate }] =
    productApi.endpoints.update.useMutation()

  const router = useRouter()
  const { user } = useAuth()

  const formatData = ({
    basicInfo,
    productInfo,
    images,
    location
  }: FieldValues): CreateProductRequest => {
    return {
      ...basicInfo,
      images: images.map(({ id }) => id),
      brandId: productInfo.brand?.id || null,
      sizeId: productInfo.size?.id || null,
      categoryId: productInfo.category.id,
      conditionId: productInfo.condition.id,
      colors: productInfo.colors?.map(({ id }) => id) || [],
      price: productInfo.price,
      cityId: location.city.id
    }
  }

  const create = async (data: FieldValues) => {
    const res = await createProduct(formatData(data))
    if (!('error' in res) && user) router.push(`/profile/${user.username}`)
  }

  const update = async (product: GetProductResponse, data: FieldValues) => {
    const res = await updateProduct({ ...formatData(data), id: product.id })
    if (!('error' in res) && user) router.push(`/products/${product.slug}`)
  }

  return { create, update, isLoadingProductCreate, isLoadingProductUpdate }
}
