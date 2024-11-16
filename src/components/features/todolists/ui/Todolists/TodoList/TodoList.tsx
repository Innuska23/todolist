import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";

import { Box } from "@mui/material";

import { TodolistType } from "../../../../../app/App";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { addTaskTC } from "../../../model/tasks-reducer";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";

type TodoListPropsType = {
    todolist: TodolistType
}

export const TodoList = ({
    todolist,
}: TodoListPropsType) => {
    const dispatch = useAppDispatch()

    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC({ title, todolistId: todolist.id }))
    }

    return (
        <Box>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskHandler} />
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist} />
        </Box>
    )
}