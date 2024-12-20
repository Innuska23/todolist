import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { loadThemeFromLocalStorage, saveThemeToLocalStorage } from "components/common/theme"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: loadThemeFromLocalStorage() as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
      saveThemeToLocalStorage(action.payload.themeMode)
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    errorAppStatus: (state) => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const { changeTheme, setAppError, setAppStatus, setIsLoggedIn } = appSlice.actions
export const { errorAppStatus, selectAppStatus, selectThemeMode, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
