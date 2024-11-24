import { Box, Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch } from "../common/hooks/useAppDispatch"

export const Main = () => {
  const dispatch = useAppDispatch()

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
