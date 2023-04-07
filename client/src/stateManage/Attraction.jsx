import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const AttractionApi = createApi({
    reducerPath: 'AttractionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.melivecode.com/api/' }),
    endpoints: (builder) => ({
        getattraAttractionByName: builder.query  ({
            query: () => `th/attractions`,
            
        }),
        getattraAttractionById: builder.query  ({
            query: (id) => `th/attractions/${id}`,
            
        }),
  }),
})


export const { useGetattraAttractionByNameQuery,useGetattraAttractionByIdQuery } = AttractionApi