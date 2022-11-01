import productApi from '@/services/products/api'
import isEmpty from 'lodash/isEmpty'
import { useMemo, useState } from 'react'

export const useBrands = () => {
  const { data, isLoading, error } = productApi.endpoints.brands.useQuery(null)
  const [search, setSearch] = useState('')

  const searchBrands = (search: string) => {
    setSearch(search)
  }

  const filteredBrands = useMemo(() => {
    const brands = data?.brands || []
    if (isEmpty(search)) return brands

    return brands.filter(city =>
      city.name.toLowerCase().startsWith(search.toLowerCase())
    )
  }, [search, data])

  return { brands: filteredBrands, isLoading, error, searchBrands, search }
}
