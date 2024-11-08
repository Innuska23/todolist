import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../common/theme"

import { Main } from "./Main"

import "./App.css"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { Header } from "components/common/components"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default App
