import { instance } from "components/common/instance"
import { Response } from "components/common/types"
import { Inputs } from "components/features/auth/ui/login/login"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<Response<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<Response>(`auth/login`)
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me")
  },
}
