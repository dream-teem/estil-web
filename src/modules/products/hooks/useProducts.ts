import productApi from '@/services/products/api'
import { PaginationArgs } from '@/types/request'
import { useEffect, useState } from 'react'
import { ProductFilter, ProductPreview } from '../types'
import { useProductFilter } from './useProductFilter'

export const useProducts = (username?: string) => {
  const [productFilter, setProductFilter] = useState<
    PaginationArgs & ProductFilter
  >({
    offset: 0,
    limit: 24,
    username
  })

  const [products, setProducts] = useState<ProductPreview[]>([])

  const { filter } = useProductFilter()
  const { data, isLoading, error } = productApi.endpoints.getProducts.useQuery({
    ...productFilter
  })

  useEffect(() => {
    if (data?.products) {
      if (productFilter.offset) setProducts([...products, ...data.products])
      else setProducts(data.products)
    }
  }, [data])

  useEffect(() => {
    setProductFilter({
      ...filter,
      offset: 0,
      limit: 24,
      username: productFilter.username
    })
  }, [filter])

  const loadMore = () => {
    if (data?.metadata) {
      const { resultCount, hasMore } = data.metadata
      if (hasMore && !isLoading)
        setProductFilter({
          ...productFilter,
          offset: data.metadata.offset
        })
    }
  }

  return {
    loadMore,
    products,
    isLoading,
    error,
    hasMore: !!data?.metadata.hasMore,
    count: data?.metadata.resultCount
  }
}
