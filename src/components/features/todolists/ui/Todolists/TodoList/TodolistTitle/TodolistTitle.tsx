import { Box, IconButton } from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import { titleContainerSx } from "./TodolistTitle.styles"
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "../../../../../todolists/api/todolistsApi"
import { RequestStatus } from "../../../../../../app/appSlice"
import { useAppDispatch } from "../../../../../../common/hooks"
import { DomainTodolist } from "../../../../../todolists/lib/types/types"

type TodolistTitleProps = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const { title, id, entityStatus } = todolist

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  return (
    <Box className={"todolist-title-container"} sx={titleContainerSx}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton size="small" onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Box>
  )
}
