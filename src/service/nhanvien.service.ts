import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const nhanViensAPI = createApi({
  reducerPath: "nhanViens",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600/api",
  }),
  tagTypes: ["nhanVien"],
  endpoints: (builder) => ({
    fetchnhanViens: builder.query<any[], void>({
      query: () => "/nhanvien",
      providesTags: ["nhanVien"],
    }),
    getnhanVienById: builder.query<any, number | string>({
      query: (id) => `/nhanVien/${id}`,
      providesTags: ["nhanVien"],
    }),
    addnhanVien: builder.mutation({
      query: (nhanViens: any) => ({
        url: "/nhanvien",
        method: "POST",
        body: nhanViens,
      }),
      invalidatesTags: ["nhanVien"],
    }),
    removenhanVien: builder.mutation({
      query: (id) => ({
        url: "/nhanVien/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["nhanVien"],
    }),
    updateNhanVien: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/nhanvien/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["nhanVien"],
    }),
  }),
});
export const {
  useAddnhanVienMutation,
  useUpdateNhanVienMutation,
  useFetchnhanViensQuery,
  useRemovenhanVienMutation,
  useGetnhanVienByIdQuery,
} = nhanViensAPI;
export const nhanVienReducer = nhanViensAPI.reducer;
export default nhanViensAPI;
