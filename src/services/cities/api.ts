import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '..'
import { GetCitiesResponse } from './types'

export const CITY_API_REDUCER_KEY = 'cityApi'

const cityApi = createApi({
  reducerPath: CITY_API_REDUCER_KEY,
  baseQuery,
  endpoints: builder => ({
    getCities: builder.query<GetCitiesResponse, null>({
      query: () => ({
        url: 'cities',
        method: 'GET'
      })
    })
  })
})

export default cityApi
