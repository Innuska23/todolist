import { changeThemeAC } from "../../../app/app-reducer"
import { AppBar, Box, IconButton, Switch, Toolbar } from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"

import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectThemeMode } from "../../../app/appSelectors"
import { MenuButton } from "./menuButton/MenuButton"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

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
      </AppBar>
    </Box>
  )
}
