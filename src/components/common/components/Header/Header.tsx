import { changeThemeAC } from "../../../app/app-reducer"
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { MenuButton } from "./menuButton/MenuButton"
import MenuIcon from "@mui/icons-material/Menu"

import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectAppStatus, selectThemeMode } from "../../../app/appSelectors"
import { logoutTC } from "components/features/auth/model/auth-reducer"
import { selectIsLoggedIn } from "components/features/auth/model/authSelector"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Box className="AddContainer">
      <AppBar position="static" sx={{ mb: "20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
            <MenuButton>Faq</MenuButton>
            <Switch color={"default"} onChange={changeModeHandler} />
          </Box>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}
