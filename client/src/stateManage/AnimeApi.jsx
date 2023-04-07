import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const AnimeApi = createApi({
    reducerPath: 'AnimeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9999/anime' }),
    endpoints: (builder) => ({
        getAnimeByName: builder.query  ({
            query: () => `/list`,
            
        }),
        getAnimeById: builder.query  ({
            query: (id) => `/list/${id}`,
            
        }),
        deleteAnime: builder.mutation({
            mutation: (id) => `/delete/${id}`,
            
        }),

  }),
})


export const { useGetAnimeByNameQuery,useGetAnimeByIdQuery,useDeleteAnimeMutation } = AnimeApi