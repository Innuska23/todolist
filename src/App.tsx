import { useState } from 'react';

import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { Box, Paper } from '@mui/material';
import { MenuButton } from './components/menuButton/MenuButton';

import { createTheme, ThemeProvider } from '@mui/material/styles'

import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { addNewTodoListAC, changeFilterAC, removeTodoAC, updateTodolistAC } from './model/todolists-reducer';
import { addTaskAC, changeTaskAC, removeTaskAC, TasksStateType, updateTaskAC } from './model/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './components/app/store';
import { changeThemeAC } from './components/app/app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

type ThemeMode = 'dark' | 'light'

function App() {

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const themeMode = useSelector<RootState, ThemeMode>(state => state.themeMode.themeMode)

    // const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({ taskId, todolistId }))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({ title, todolistId }))
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeFilterAC({ id, filter }))
    }

    const changeStatusTask = (taskId: string, status: boolean, todolistId: string) => {
        dispatch(changeTaskAC({ taskId, status, todolistId }))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodoAC(todolistId))
    }

    const addNewTodoList = (todolistValue: string) => {
        const action = addNewTodoListAC(todolistValue)
        dispatch(action);
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskAC({ todolistId, taskId, title }))
    };

    const updateTodolist = (id: string, title: string) => {
        dispatch(updateTodolistAC({ id, title }))
    }


    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#0288d1',
            },
        },
    })

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box className='App'>
                <Box className='AddContainer'>
                    <AppBar position="static" sx={{ mb: '20px' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Box>
                                <MenuButton>Login</MenuButton>
                                <MenuButton>Logout</MenuButton>
                                <MenuButton>Faq</MenuButton>
                                <Switch color={'default'} onChange={changeModeHandler} />
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Container fixed>
                    <Grid container sx={{ mb: '20px' }}>
                        <AddItemForm addItem={addNewTodoList} />
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map((tl) => {
                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                            }

                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                            }

                            return (
                                <Grid key={tl.id}>
                                    <Paper
                                        elevation={3}
                                        sx={{ p: 2 }}>

                                        <TodoList
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatusTask={changeStatusTask}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
                                        />

                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};


export default App;
