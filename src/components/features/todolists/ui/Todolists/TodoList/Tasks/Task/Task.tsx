import { ChangeEvent } from "react"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"

import { TodolistType } from "../../../../../../../app/App"
import { TaskType } from "../../TodoList"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { changeTaskAC, removeTaskAC, updateTaskAC } from "../../../../../model/tasks-reducer"

import { formAddedContainerSx, taskTextSx } from "./Task.styles"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"

type TaskProps = {
    task: TaskType
    todolist: TodolistType
}

export const Task = ({ task, todolist }: TaskProps) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked
        dispatch(changeTaskAC({ taskId: task.id, status, todolistId: todolist.id }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskAC({ taskId: task.id, title, todolistId: todolist.id }))
    }

    return (
        <ListItem
            sx={formAddedContainerSx}>
            <Box sx={taskTextSx(task.isDone)}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </Box>
            <IconButton onClick={removeTaskHandler}>
                <DeleteOutlineRoundedIcon />
            </IconButton>
        </ListItem>
    )
}