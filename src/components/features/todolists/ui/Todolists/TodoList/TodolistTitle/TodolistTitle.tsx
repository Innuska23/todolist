import { Box, IconButton } from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

import { removeTodoAC, updateTodolistAC } from "../../../../model/todolists-reducer"
import { todolistContainer } from "./TodolistTitle.styles"

import { EditableSpan } from "components/common/components"
import { useAppDispatch } from "components/common/hooks"
import { TodolistType } from "components/app/App"

type TodolistTitleProps = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodoAC(id))
  }
  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistAC({ id, title }))
  }

  return (
    <Box className={"todolist-title-container"} sx={todolistContainer}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton size="small" onClick={removeTodolistHandler}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Box>
  )
}
