import { Box, IconButton } from "@mui/material"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { TodolistType } from "../../../../../../app/App"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import { removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer";
import { todolistContainer } from "./TodolistTitle.styles";

import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";

type TodolistTitleProps = {
    todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
    const { title, id } = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(updateTodolistTitleTC({ id, title }))
    }

    return (
        <Box className={'todolist-title-container'} sx={todolistContainer}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} />
            </h3>
            <IconButton
                size="small"
                onClick={removeTodolistHandler}>
                <DeleteOutlineRoundedIcon />
            </IconButton>
        </Box>
    )
}