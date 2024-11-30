import { Box, Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "components/features/auth/model/authSelector"
import { useAppSelector } from "components/common/hooks"
import { useEffect } from "react"
import { Path } from "components/common/routing/routing"

export const Main = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn, navigate])

  const addNewTodoList = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  return (
    <Container fixed>
      <Box
        sx={{
          p: "20px 0",
          maxWidth: { xs: "100%", sm: "70%", md: "50%" },
          margin: "0 auto",
        }}
      >
        <AddItemForm addItem={addNewTodoList} />
      </Box>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
