import { Box, Button } from "@mui/material"

import { FilterValuesType, TodolistType } from "../../../../../../app/App"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { changeFilter } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"

type FilterTasksButtonsType = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsType) => {
  const dispatch = useAppDispatch()

  const { filter, id } = todolist

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeFilter({ filter, id }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
        disabled={todolist.entityStatus === "loading"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
        disabled={todolist.entityStatus === "loading"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
        disabled={todolist.entityStatus === "loading"}
      >
        Completed
      </Button>
    </Box>
  )
}
