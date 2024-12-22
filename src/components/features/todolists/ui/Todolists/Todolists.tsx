import { Grid } from "@mui/material"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

import { TodoList } from "./TodoList/TodoList"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"
import { StyledPaper } from "./Todolists.styles"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <Grid container spacing={4}>
      {todolists?.map((tl) => (
        <Grid key={tl.id} item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} sx={{ height: "100%" }}>
            <TodoList todolist={tl} />
          </StyledPaper>
        </Grid>
      ))}
    </Grid>
  )
}
