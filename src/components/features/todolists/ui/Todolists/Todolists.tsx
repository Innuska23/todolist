import { Grid, Paper } from "@mui/material";

import { TodoList } from "./TodoList/TodoList";

import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { selectTask } from "../../model/tasksSelectors";
import { selectTodolists } from "../../model/todolistsSelectors";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTask)

    return (
        <>
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                    }

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                    }

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