import { Box } from "@mui/material"

import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../model/tasksSlice"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { DomainTodolist } from "components/features/todolists/model/todolistsSlice"

type TodoListPropsType = {
  todolist: DomainTodolist
}

export const TodoList = ({ todolist }: TodoListPropsType) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
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
