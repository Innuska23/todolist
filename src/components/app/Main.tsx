import { useEffect } from "react"
import { useNavigate } from "react-router"

import { Box, Container } from "@mui/material"
import Grid from "@mui/material/Grid2"

import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppSelector } from "components/common/hooks"
import { Path } from "components/common/routing/routing"
import { useAddTodolistMutation } from "components/features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  const navigate = useNavigate()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn, navigate])

  const addNewTodoList = (title: string) => {
    addTodolist(title)
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

      <Grid container spacing={5}>
        <Todolists />
      </Grid>
    </Container>
  )
}
