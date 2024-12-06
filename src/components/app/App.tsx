import { useEffect } from "react"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress } from "@mui/material"

import { getTheme } from "../common/theme/theme"
import { Header } from "../common/components/Header/Header"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { RequestStatus, selectThemeMode } from "./appSlice"
import { Routing } from "components/common/routing/routing"
import { useAppDispatch } from "components/common/hooks"
import { initializeAppTC, selectIsInitialized } from "components/features/auth/model/authSlice"

import "./App.css"
import s from "./App.module.css"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
  entityStatus: RequestStatus
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress color="secondary" size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

export default App
