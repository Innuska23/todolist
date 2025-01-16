import { useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress } from "@mui/material"

import { getTheme } from "../common/theme/theme"
import { Header } from "../common/components/Header/Header"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { useAppDispatch } from "../common/hooks"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "components/common/enums"
import { useTheme } from "./lib/hooks/useTheme"
import { Routing } from "../common/routing/routing"

import "./App.css"
import s from "./App.module.css"

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const { themeMode, setThemeMode } = useTheme()

  const theme = useAppSelector(selectThemeMode)
  const { data, isLoading } = useMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data, dispatch])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress color="secondary" size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

export default App
