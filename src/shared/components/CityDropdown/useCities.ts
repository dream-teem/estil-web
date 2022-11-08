import cityApi from '@/services/cities/api'
import isEmpty from 'lodash/isEmpty'
import { useMemo, useState } from 'react'

export const useCities = () => {
  const {
    data: cities = [],
    isLoading,
    error
  } = cityApi.endpoints.getCities.useQuery(null)
  const [search, setSearch] = useState('')

  const searchCities = (search: string) => {
    setSearch(search)
  }

  const getCityById = (id: number) => {
    return cities.find(city => city.id === id)
  }

  const filteredCities = useMemo(() => {
    if (isEmpty(search)) return cities

    return cities.filter(city =>
      city.name.toLowerCase().startsWith(search.toLowerCase())
    )
  }, [search, cities])

  return {
    cities: filteredCities,
    getCityById,
    isLoading,
    error,
    searchCities,
    search
  }
}
