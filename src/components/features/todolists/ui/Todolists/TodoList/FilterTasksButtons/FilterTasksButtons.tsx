import { Box, Button } from "@mui/material"
import { FilterValuesType, TodolistType } from "../../../../../../app/App"

import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { changeFilterAC } from "../../../../model/todolists-reducer"

import { useAppDispatch } from "components/common/hooks"

type FilterTasksButtonsType = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsType) => {
  const dispatch = useAppDispatch()

  const { filter, id } = todolist

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeFilterAC({ filter, id }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
