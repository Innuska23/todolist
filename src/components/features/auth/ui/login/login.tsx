import { FormControl, Grid } from "@mui/material"
import { useNavigate } from "react-router"
import { useEffect } from "react"

import { Path } from "../../../../common/routing/routing"
import { useLogin } from "../../lib/hooks/useLogin"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel "
import { LoginForm } from "./LoginForm/LoginForm"
import { container, formControl, formWrapper } from "./Login.styles"

export const Login = () => {
  const { isLoggedIn } = useLogin()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn, navigate])

  return (
    <Grid container sx={container}>
      <Grid item sx={formWrapper}>
        <FormControl sx={formControl}>
          <LoginFormLabel />
          <LoginForm />
        </FormControl>
      </Grid>
    </Grid>
  )
}
