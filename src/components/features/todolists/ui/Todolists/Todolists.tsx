import { Grid, Paper } from "@mui/material";

import { TodoList } from "./TodoList/TodoList";

import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { selectTodolists } from "../../model/todolistsSelectors";
import { useEffect } from "react";
import { useAppDispatch } from "components/common/hooks";
import { fetchTodolistsTC } from "../../model/todolists-reducer";

export const Todolists = () => {

  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <>
      {
        todolists.map((tl) => {

          return (
            <Grid key={tl.id}>
              <Paper
                elevation={3}
                sx={{ p: 2 }}>

                <TodoList
                  todolist={tl}
                />

              </Paper>
            </Grid>
          );
        })
      }
    </>
  )

}