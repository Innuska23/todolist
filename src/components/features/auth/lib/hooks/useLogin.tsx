import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "components/app/appSlice"
import { ResultCode } from "components/common/enums"
import { useAppDispatch, useAppSelector } from "components/common/hooks"
import { getTheme } from "components/common/theme"
import { useLoginMutation } from "components/features/auth/api/authApi"
import { LoginArgs } from "components/features/auth/api/authApi.types"
import { SubmitHandler, useForm } from "react-hook-form"

export const useLogin = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem("sn-token", res.data.data.token)
        }
      })
      .finally(() => {
        reset()
      })
  }

  return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register }
}
