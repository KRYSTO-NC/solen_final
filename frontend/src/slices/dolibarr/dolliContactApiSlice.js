import { DOLIBAR_URL } from '../../constants/constants'
import { apiSlice } from '../apiSlice'
import { DOLIBARR_API_KEY } from '../../constants/constants'

export const dolliContactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/contacts&limit=100`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getContactDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/contacts/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactDetailsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliContactApiSlice
