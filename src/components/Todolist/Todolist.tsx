import { ChangeEvent } from "react";
import '../../App.css'
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import { Box, Button, Checkbox, IconButton } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { filterButtonsContainerSx, formAddedContainerSx, listItemSx } from "./Todolist.styles";
import { FilterValuesType } from "../../App";


type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusTask: (taskId: string, status: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatusTask,
    filter,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist
}: TodoListPropsType) => {

    const deleteTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTodoTitleHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <Box>
            <Box sx={formAddedContainerSx}>
                <EditableSpan value={title} onChange={changeTodoTitleHandler} />
                <IconButton
                    size="small"
                    onClick={deleteTodolistHandler}>
                    <DeleteOutlineRoundedIcon />
                </IconButton>
            </Box>

            <AddItemForm addItem={addTaskHandler} />

            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (

                <List>
                    {tasks.map((task) => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        }

                        const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatusTask(task.id, e.currentTarget.checked, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }
                        return (
                            <ListItem
                                key={task.id}
                                sx={listItemSx}>

                                <Box>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={changeStatusTaskHandler}
                                        size='medium' />
                                    <EditableSpan className={task.isDone ? "is-done" : ''} value={task.title} onChange={changeTaskTitleHandler} />
                                </Box>

                                <IconButton
                                    onClick={removeTaskHandler}
                                    color='primary'
                                    size='small'>
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>

                            </ListItem>
                        )
                    })}
                </List>
            )
            }

            <Box sx={filterButtonsContainerSx}>
                <Button color='inherit' variant={filter === 'all' ? 'outlined' : "text"} onClick={() => { changeFilter('all', todolistId) }} >All </Button>
                <Button color='primary' variant={filter === 'active' ? 'outlined' : "text"} onClick={() => { changeFilter('active', todolistId) }} > Active </Button>
                <Button color='secondary' variant={filter === 'completed' ? 'outlined' : "text"} onClick={() => { changeFilter('completed', todolistId) }}>Completed  </Button>
            </Box>

        </Box>
    )
}