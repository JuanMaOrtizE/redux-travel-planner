import { api } from "../../services/api";
import type { LoginRequest, AuthUserResponse } from "./auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUserResponse, LoginRequest>({
      query: (credentials) => {
        return { url: "auth/login", method: "POST", body: credentials };
      },
      invalidatesTags: (result) => (result ? ["Auth"] : []),
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return { url: "auth/logout", method: "POST" };
      },
    }),
    getCurrentUser: builder.query<AuthUserResponse, void>({
      query: () => {
        return "auth/me";
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApi;
