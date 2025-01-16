import { instance } from "../../../common/instance"
import { Response } from "../../../common/types"
import { baseApi } from "../../todolists/api/baseApi";
import { LoginArgs } from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<Response<{ id: number; email: string; login: string }>, void>({
      query: () => 'auth/me',
    }),
    login: build.mutation<Response<{ userId: number; token: string }>, LoginArgs>({
      query: payload => {
        return {
          method: 'POST',
          url: 'auth/login',
          body: payload,
        }
      },
    }),
    logout: build.mutation<Response, void>({
      query: () => {
        return {
          method: 'DELETE',
          url: 'auth/login',
        }
      },
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<Response<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<Response>(`auth/login`)
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me")
  },
}
