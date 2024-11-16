import { ChangeEvent } from "react"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"

import { TodolistType } from "../../../../../../../app/App"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { changeTaskStatusTC, removeTaskTC, updateTaskAC } from "../../../../../model/tasks-reducer"

import { formAddedContainerSx, taskTextSx } from "./Task.styles"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { DomainTask } from "components/features/todolists/api/tasksApi.types"
import { TaskStatus } from "components/common/enums";

type TaskProps = {
    task: DomainTask
    todolist: TodolistType
}

export const Task = ({ task, todolist }: TaskProps) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }));
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(changeTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskAC({ taskId: task.id, title, todolistId: todolist.id }))
    }

    return (
        <ListItem
            sx={formAddedContainerSx}>
            <Box sx={taskTextSx(task.status === TaskStatus.Completed)}>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </Box>
            <IconButton onClick={removeTaskHandler}>
                <DeleteOutlineRoundedIcon />
            </IconButton>
        </ListItem>
    )
}