import productApi from '@/services/products/api'

export const useColors = () => {
  const { data = [] } = productApi.endpoints.colors.useQuery(null)
  return data
}
