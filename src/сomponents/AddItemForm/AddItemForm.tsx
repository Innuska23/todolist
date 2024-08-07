import { useState, ChangeEvent, KeyboardEvent } from "react";

import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";


type AddItemPropsType = {
    addItem: (title: string) => void
}
export function AddItemForm(props: AddItemPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
        else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField
                value={newTaskTitle}
                variant={'outlined'}
                label="Type value"
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error} />
            <IconButton
                onClick={addTask}
                color={"primary"}><ControlPoint /></IconButton>
        </div>
    )
}
