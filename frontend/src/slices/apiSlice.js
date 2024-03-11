import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/constants'
import { DOLIBAR_URL } from '../constants/constants'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLIBAR_URL })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Simulation', 'User'],
  endpoints: (builder) => ({}),
})

export const dolibarrApiSlice = createApi({
  baseQuery: doliBaseQuery,
  tagTypes: ['ThirdParty'],
  endpoints: (builder) => ({}),
})
