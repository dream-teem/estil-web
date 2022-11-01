import cityApi from '@/services/cities/api'
import isEmpty from 'lodash/isEmpty'
import { useMemo, useState } from 'react'

export const useCities = () => {
  const { data, isLoading, error } = cityApi.endpoints.getCities.useQuery(null)
  const [search, setSearch] = useState('')

  const searchCities = (search: string) => {
    setSearch(search)
  }

  const filteredCities = useMemo(() => {
    const cities = data || []
    if (isEmpty(search)) return cities

    return cities.filter(city =>
      city.name.toLowerCase().startsWith(search.toLowerCase())
    )
  }, [search, data])

  return { cities: filteredCities, isLoading, error, searchCities, search }
}
