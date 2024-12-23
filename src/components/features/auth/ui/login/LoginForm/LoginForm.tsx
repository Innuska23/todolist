import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

import { useLogin } from "components/features/auth/lib/hooks/useLogin"

export const LoginForm = () => {
  const { handleSubmit, onSubmit, register, errors, control } = useLogin()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <TextField
          label="Email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Incorrect email address",
            },
          })}
        />

        <TextField
          type="password"
          label="Password"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters long",
            },
          })}
        />

        <FormControlLabel
          label={"Remember me"}
          control={
            <Controller
              name={"rememberMe"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
              )}
            />
          }
        />

        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Login
        </Button>
      </FormGroup>
    </form>
  )
}
