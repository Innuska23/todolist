import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { selectThemeMode } from "components/app/appSelectors"
import { useAppDispatch, useAppSelector } from "components/common/hooks"
import { getTheme } from "components/common/theme"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { loginTC } from "components/features/auth/model/authSlice"
import { selectIsLoggedIn } from "components/features/auth/model/authSelector"
import { useNavigate } from "react-router"
import { Path } from "components/common/routing/routing"
import { useEffect } from "react"

export type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const navigate = useNavigate()

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(loginTC(data))
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(Path.Main)
        }
    }, [isLoggedIn, navigate])



    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormLabel>
                            <p>
                                To login get registered
                                <a
                                    style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                                    href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'}
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>
                                <b>Email:</b> free@samuraijs.com
                            </p>
                            <p>
                                <b>Password:</b> free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Incorrect email address',
                                    },
                                })}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Password must be at least 3 characters long'
                                    },
                                })}
                            />
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        name={'rememberMe'}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox onChange={e => onChange(e.target.checked)} checked={value} />)}
                                    />
                                }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid >
    )
}
