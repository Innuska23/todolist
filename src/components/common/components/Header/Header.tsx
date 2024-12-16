import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"

import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedIn,
  ThemeMode,
} from "../../../app/appSlice"
import { MenuButton } from "./menuButton/MenuButton"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useLogoutMutation } from "components/features/auth/api/authApi"
import { ResultCode } from "components/common/enums"
import { baseApi } from "components/features/todolists/api/baseApi"

type HeaderProps = {
  themeMode: ThemeMode
  setThemeMode: (theme: ThemeMode) => void
}

export const Header = ({ themeMode, setThemeMode }: HeaderProps) => {
  const modeTheme = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    const newMode = modeTheme === "light" ? "dark" : "light"
    dispatch(changeTheme({ themeMode: newMode }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist"]))
        dispatch(baseApi.util.invalidateTags(["Task"]))
      })
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
            <Switch color="default" checked={modeTheme === "dark"} onChange={changeModeHandler} />
          </Box>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}
