import { Container } from "@mui/material";
import Grid from '@mui/material/Grid2'

import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";
import { addNewTodoListAC } from "../features/todolists/model/todolists-reducer";

import { useAppDispatch } from "../common/hooks/useAppDispatch";

export const Main = () => {

    const dispatch = useAppDispatch()

    const addNewTodoList = (todolistValue: string) => {
        const action = addNewTodoListAC(todolistValue)
        dispatch(action);
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: '20px' }}>
                <AddItemForm addItem={addNewTodoList} />
            </Grid>

            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}