import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category) => {
        let params = `category=${category}`
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/products?${params}&mode=0&limit=1000`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getProductCategories: builder.query({
      query: () => ({
        // Ajoutez "variant_filter" comme paramètre ici.
        url: `${DOLIBAR_URL}/categories`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        params: {
          type: 'product',
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/products/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategoriesQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProductApiSlice
