import { Box, List, Typography } from "@mui/material"
import { Task } from "./Task/Task"
import { TaskStatus } from "components/common/enums"
import { DomainTodolist } from "components/features/todolists/model/todolistsSlice"
import { useGetTasksQuery } from "components/features/todolists/api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"

type TasksType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: TasksType) => {
  const { data: tasks, isLoading } = useGetTasksQuery(todolist.id)

  let tasksForTodolist = tasks

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ margin: "auto" }}>
          <Typography variant="h6">There are no tasks...</Typography>
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
