import productApi from '@/services/products/api'
import { useMemo } from 'react'
import { ProductCategory } from '../types'
import { flatMap } from '../utils'

export const useCategories = () => {
  const { data: categories = [], isLoading } =
    productApi.endpoints.getCategoriesTree.useQuery(null)

  const categoryMap = useMemo(
    () =>
      flatMap(categories, c => c.subCategories).reduce((prev, curr) => {
        prev[curr.id] = curr
        return prev
      }, {} as Record<string, ProductCategory>),
    [categories]
  )

  return { categoryMap, categories, isLoading }
}
