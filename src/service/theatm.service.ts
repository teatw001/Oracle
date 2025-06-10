import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const theATMsAPI = createApi({
  reducerPath: "theATMs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600/api",
  }),
  tagTypes: ["theATM"],
  endpoints: (builder) => ({
    fetchtheATMs: builder.query<any[], void>({
      query: () => "/theatm",
      providesTags: ["theATM"],
    }),
    gettheATMById: builder.query<any, number | string>({
      query: (id) => `/theatm/${id}`,
      providesTags: ["theATM"],
    }),
    addtheATM: builder.mutation({
      query: (theATMs: any) => ({
        url: "/theatm",
        method: "POST",
        body: theATMs,
      }),
      invalidatesTags: ["theATM"],
    }),
    gettheATMKH: builder.mutation({
      query: (theATMs: any) => ({
        url: "/theatm/list-atm",
        method: "POST",
        body: theATMs,
      }),
      invalidatesTags: ["theATM"],
    }),

    removetheATM: builder.mutation({
      query: (id) => ({
        url: "/theATM/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["theATM"],
    }),
    updatetheATM: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/theATM/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["theATM"],
    }),
  }),
});
export const {
  useAddtheATMMutation,
  useRemovetheATMMutation,
  useFetchtheATMsQuery,
  useUpdatetheATMMutation,
  useGettheATMByIdQuery,
  useGettheATMKHMutation,
 
} = theATMsAPI;
export const theATMReducer = theATMsAPI.reducer;
export default theATMsAPI;
