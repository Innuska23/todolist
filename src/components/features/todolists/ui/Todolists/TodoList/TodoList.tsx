import { Box } from "@mui/material"

import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useCreateTaskMutation } from "components/features/todolists/api/tasksApi"
import { DomainTodolist } from "components/features/todolists/lib/types/types"

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoList = ({ todolist }: TodoListPropsType) => {
  const [createTask] = useCreateTaskMutation()

  const addTaskHandler = (title: string) => {
    createTask({ title, todolistId: todolist.id })
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <Box marginTop="auto">
        <FilterTasksButtons todolist={todolist} />
      </Box>
    </Box>
  )
}
