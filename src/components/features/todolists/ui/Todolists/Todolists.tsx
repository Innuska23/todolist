import { useEffect } from "react"
import { Grid, Paper } from "@mui/material"

import { TodoList } from "./TodoList/TodoList"
import { useAppDispatch } from "components/common/hooks"
import { fetchTodolistsTC } from "../../model/todolistsSlice"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id} sx={{ width: "350px", wordWrap: "break-word" }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: 400,
                overflow: "auto",
                border: "2px solid #7a6899",
                boxShadow: "0 0 15px rgba(128, 0, 128, 0.3)",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                whiteSpace: "normal",
              }}
            >
              <TodoList todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
