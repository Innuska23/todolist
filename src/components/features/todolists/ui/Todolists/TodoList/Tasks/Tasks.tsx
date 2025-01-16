import { Box, List, Typography } from "@mui/material"

import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { DomainTodolist } from "../../../../../todolists/lib/types/types"
import { useTasks } from "../../../../../todolists/lib/hooks/useTasks"

type TasksType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: TasksType) => {
  const { isLoading, page, setPage, tasks, totalCount } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {tasks?.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ margin: "auto" }}>
          <Typography variant="h6">There are no tasks...</Typography>
        </Box>
      ) : (
        <>
          <List>
            {tasks?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          <Box sx={{ mt: "auto" }}>
            <TasksPagination totalCount={totalCount} page={page} setPage={setPage} />
          </Box>
        </>
      )}
    </Box>
  )
}
