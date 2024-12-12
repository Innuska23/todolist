import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"

import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { MenuButton } from "./menuButton/MenuButton"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useLogoutMutation } from "components/features/auth/api/authApi"
import { ResultCode } from "components/common/enums"
import { baseApi } from "components/features/todolists/api/baseApi"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
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
            <Switch color={"default"} onChange={changeModeHandler} />
          </Box>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}
