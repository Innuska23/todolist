import { Box, List, Typography } from "@mui/material"
import { Task } from "./Task/Task"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { TaskStatus } from "components/common/enums"
import { DomainTodolist } from "components/features/todolists/model/todolistsSlice"
import { selectTask } from "components/features/todolists/model/tasksSlice"

type TasksType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: TasksType) => {
  const tasks = useAppSelector(selectTask)

  const allTodolistTasks = tasks[todolist.id] || []

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
          <Typography variant="h6">There are no tasks.</Typography>
        </Box>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
