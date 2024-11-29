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

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
  entityStatus: RequestStatus
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)

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
