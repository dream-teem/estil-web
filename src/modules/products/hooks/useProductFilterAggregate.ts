import productApi from '@/services/products/api'
import { useProductFilter } from './useProductFilter'

export const useProductFilterAggregate = () => {
  const { filter } = useProductFilter()
  const {
    data: filterAggregates,
    isLoading,
    isError,
    refetch
  } = productApi.endpoints.getProductFilterAggregate.useQuery(filter)

  return { filterAggregates, isLoading, isError, refetch }
}
