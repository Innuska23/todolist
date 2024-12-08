import { useEffect } from "react"
import { Grid, Paper } from "@mui/material"

import { TodoList } from "./TodoList/TodoList"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { useAppDispatch } from "components/common/hooks"
import { fetchTodolistsTC, selectTodolists } from "../../model/todolistsSlice"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <>
      {todolists.map((tl) => {
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
