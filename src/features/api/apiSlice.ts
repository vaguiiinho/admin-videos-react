import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseUrl = 'http://localhost:8000/api'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    tagTypes: ["Categories", "CastMembers"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl })
})