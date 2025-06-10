import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600/api",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<any[], void>({
      query: () => "/user/",
      providesTags: ["user"],
    }),
    getUserById: builder.query<any, number | string>({
      query: (id) => `/user/${id}`,
      providesTags: ["user"],
    }),
    addUser: builder.mutation({
      query: (users: any) => ({
        url: "/signup/",
        method: "POST",
        body: users,
      }),
      invalidatesTags: ["user"],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: "/user/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getAllAcccont: builder.query<any[], void>({
      query: () => "/accounts",
      providesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (credentials: { taikhoan: string; matkhau: string }) => ({
        url: "/accounts/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    addAccount: builder.mutation({
      query: (user: any) => ({
        url: "/accounts",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useAddUserMutation,
  useLoginUserMutation,
  useAddAccountMutation,
  useFetchUsersQuery,
  useGetAllAcccontQuery,
  useRemoveUserMutation,
  useGetUserByIdQuery,
} = usersAPI;
export const AccountReducer = usersAPI.reducer;
export default usersAPI;
