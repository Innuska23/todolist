import { changeThemeAC } from "../../../app/app-reducer"
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { MenuButton } from "./menuButton/MenuButton"
import MenuIcon from "@mui/icons-material/Menu"

import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectAppStatus, selectThemeMode } from "../../../app/appSelectors"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  return (
    <Box className="AddContainer">
      <AppBar position="static" sx={{ mb: "20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton>Faq</MenuButton>
            <Switch color={"default"} onChange={changeModeHandler} />
          </Box>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}
