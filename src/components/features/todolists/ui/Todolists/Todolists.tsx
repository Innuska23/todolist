import { useEffect } from "react"
import { Grid } from "@mui/material"

import { TodoList } from "./TodoList/TodoList"
import { useAppDispatch } from "components/common/hooks"
import { fetchTodolistsTC } from "../../model/todolistsSlice"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { StyledPaper } from "./Todolists.styles"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      {todolists?.map((tl) => (
        <Grid key={tl.id} item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3}>
            <TodoList todolist={tl} />
          </StyledPaper>
        </Grid>
      ))}
    </Grid>
  )
}
