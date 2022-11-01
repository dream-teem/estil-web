import productApi from '@/services/products/api'

export const useConditions = () => {
  const { data = [] } = productApi.endpoints.conditions.useQuery(null)
  return data
}
