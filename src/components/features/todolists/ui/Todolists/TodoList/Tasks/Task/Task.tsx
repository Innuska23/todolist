import { ChangeEvent, useCallback } from "react"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import { formAddedContainerSx, taskTextSx } from "./Task.styles"
import { DomainTaskUi, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "components/common/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import { DomainTodolist } from "../../../../../lib/types/types"

type TaskProps = {
  task: DomainTaskUi
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: TaskProps) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const createUpdateModel = useCallback(
    (changes: Partial<UpdateTaskModel>) => {
      return {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...changes,
      }
    },
    [task],
  )

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ status }),
    })
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ title }),
    })
  }

  const isDisabled = todolist.entityStatus === "loading" || task.isLoading

  return (
    <ListItem sx={formAddedContainerSx}>
      <Box sx={taskTextSx(task.status === TaskStatus.Completed)}>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={isDisabled}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={!!isDisabled} />
      </Box>
      <IconButton onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </ListItem>
  )
}
