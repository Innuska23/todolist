import { Box, IconButton } from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolistsSlice"
import { todolistContainer } from "./TodolistTitle.styles"

import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"

type TodolistTitleProps = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }
  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
  }

  return (
    <Box className={"todolist-title-container"} sx={todolistContainer}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton size="small" onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Box>
  )
}
