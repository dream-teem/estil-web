import productApi from '@/services/products/api'
import values from 'lodash/values'
import { useMemo } from 'react'
import { ProductSize } from '../types'

export const useSizeGroups = () => {
  const { data: sizeGroups = {} } =
    productApi.endpoints.sizeGroups.useQuery(null)

  const sizes = useMemo(() => {
    return values(sizeGroups).reduce(
      (sizes, sg) => sizes.concat(sg.sizes),
      [] as ProductSize[]
    )
  }, [sizeGroups])

  return { sizeGroups, sizes }
}
