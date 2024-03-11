import { SIMULATIONS_URL } from '../constants/constants'
import { apiSlice } from './apiSlice'

export const simulationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSimulations: builder.query({
      query: () => ({
        url: SIMULATIONS_URL,
      }),
      //indique que les données non utilisées seront conservées pendant 5 secondes avant d'être supprimées.Cela peut être utile pour le cache
      providesTags: ['Simulation'],
      keepUnusedDataFor: 5,
    }),

    getSimulationDetails: builder.query({
      query: (simulationId) => ({
        url: `${SIMULATIONS_URL}/${simulationId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createSimulation: builder.mutation({
      query: () => ({
        url: SIMULATIONS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Simulation'],
    }),

    updateSimulation: builder.mutation({
      query: (data) => ({
        url: `${SIMULATIONS_URL}/${data.simulationId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Simulation'],
    }),

    deleteSimulation: builder.mutation({
      query: (simulationId) => ({
        url: `${SIMULATIONS_URL}/${simulationId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetSimulationsQuery,
  useGetSimulationDetailsQuery,
  useCreateSimulationMutation,
  useDeleteSimulationMutation,
  useUpdateSimulationMutation,
} = simulationsApiSlice
