import { FormControl, Grid } from "@mui/material"
import { useNavigate } from "react-router"
import { useEffect } from "react"

import { Path } from "components/common/routing/routing"
import { useLogin } from "../../lib/hooks/useLogin"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel "
import { LoginForm } from "./LoginForm/LoginForm"

export const Login = () => {
  const { isLoggedIn} = useLogin()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn, navigate])

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <LoginFormLabel />
          <LoginForm />
        </FormControl>
      </Grid>
    </Grid>
  )
}
