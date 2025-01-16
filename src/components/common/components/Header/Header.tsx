import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"

import { selectAppStatus, selectIsLoggedIn, ThemeMode } from "../../../app/appSlice"
import { MenuButton } from "./menuButton/MenuButton"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAuth } from "../../hooks/useAuth"
import { useThemeToggle } from "../../hooks/useThemeToggle"

type HeaderProps = {
  themeMode: ThemeMode
  setThemeMode: (theme: ThemeMode) => void
}

export const Header = ({ themeMode, setThemeMode }: HeaderProps) => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { handleLogout } = useAuth()
  const { currentTheme, toggleTheme } = useThemeToggle()

  return (
    <Box className="AddContainer">
      <AppBar position="static" sx={{ mb: "20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            {isLoggedIn && <MenuButton onClick={handleLogout}>Logout</MenuButton>}
            <MenuButton>Faq</MenuButton>
            <Switch color="default" checked={currentTheme === "dark"} onChange={toggleTheme} />
          </Box>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}
