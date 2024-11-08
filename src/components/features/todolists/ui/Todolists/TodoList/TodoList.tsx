import { Box } from "@mui/material"

import { TodolistType } from "../../../../../app/App"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC } from "../../../model/tasks-reducer"
import { AddItemForm } from "components/common/components"
import { useAppDispatch } from "components/common/hooks"

type TodoListPropsType = {
  todolist: TodolistType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList = ({ todolist }: TodoListPropsType) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }))
  }

  return (
    <Box>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </Box>
  )
}
