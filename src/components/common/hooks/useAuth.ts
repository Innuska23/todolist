import { useLogoutMutation } from "components/features/auth/api/authApi"
import { ResultCode } from "components/common/enums"
import { baseApi } from "components/features/todolists/api/baseApi"
import { useAppDispatch } from "./useAppDispatch"
import { setIsLoggedIn } from "components/app/appSlice"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    const res = await logout()
    
    if ('data' in res && res.data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      localStorage.removeItem("sn-token")
      
      dispatch(baseApi.util.invalidateTags(["Todolist"]))
      dispatch(baseApi.util.invalidateTags(["Task"]))
    }
  }

  return { handleLogout }
}