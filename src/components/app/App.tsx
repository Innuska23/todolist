import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../common/theme/theme"
import { Header } from "../common/components/Header/Header"

import "./App.css"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { RequestStatus } from "./app-reducer"
import { Routing } from "components/common/routing/routing"
import { useAppDispatch } from "components/common/hooks"
import { useEffect } from "react"
import { initializeAppTC } from "components/features/auth/model/auth-reducer"
import { CircularProgress } from "@mui/material"

import s from './App.module.css'
import { selectIsInitialized } from "components/features/auth/model/authSelector"

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
        <CircularProgress size={150} thickness={3} />
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
