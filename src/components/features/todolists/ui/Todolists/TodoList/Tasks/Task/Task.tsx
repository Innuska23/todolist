import { ChangeEvent } from "react"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"

import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { changeTaskStatusTC, removeTaskTC, updateTaskTitleTC } from "../../../../../model/tasks-reducer"

import { formAddedContainerSx, taskTextSx } from "./Task.styles"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { DomainTask } from "components/features/todolists/api/tasksApi.types"
import { TaskStatus } from "components/common/enums";
import { DomainTodolist } from "components/features/todolists/model/todolists-reducer";

type TaskProps = {
    task: DomainTask
    todolist: DomainTodolist
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
        dispatch(updateTaskTitleTC({ taskId: task.id, title, todolistId: todolist.id }))
    }
    console.log("Task entityStatus:", todolist.entityStatus);
    return (
        <ListItem
            sx={formAddedContainerSx}>
            <Box sx={taskTextSx(task.status === TaskStatus.Completed)}>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={todolist.entityStatus === 'loading'} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={todolist.entityStatus === 'loading'} />
            </Box>
            <IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === 'loading'}>
                <DeleteOutlineRoundedIcon />
            </IconButton>
        </ListItem>
    )
}