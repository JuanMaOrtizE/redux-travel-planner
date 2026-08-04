import { api } from "../../services/api";
import type { LoginRequest, AuthUserResponse } from "./auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUserResponse, LoginRequest>({
      query: (credentials) => {
        return { url: "auth/login", method: "POST", body: credentials };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
