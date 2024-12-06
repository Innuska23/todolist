import { Dispatch } from "redux"
import { createSlice } from "@reduxjs/toolkit"

import { setAppStatus } from "components/app/appSlice"
import { AppDispatch } from "components/app/store"
import { Inputs } from "components/features/auth/ui/login/login"
import { authApi } from "../api/authApi"
import { ResultCode } from "components/common/enums"
import { handleServerAppError, handleServerNetworkError } from "components/common/utils"
import { clearTodosData } from "components/features/todolists/model/todolistsSlice"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { selectIsInitialized, selectIsLoggedIn } = authSlice.selectors
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions

export const loginTC = (data: Inputs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(clearTodosData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
