import { useReducer, useState } from 'react';
import { v1 } from 'uuid';

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
import { addNewTodoListAC, changeFilterAC, removeTodoAC, todoListReducer, updateTodolistAC } from './model/todolists-reducer';
import { addNewTodoListTaskAC, addTaskAC, changeTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from './model/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

type ThemeMode = 'dark' | 'light'

function App() {

    const todolistId_1 = v1();
    const todolistId_2 = v1()

    let [todolists, dispatchTodolist] = useReducer(todoListReducer, [
        { id: todolistId_1, title: 'What to learn', filter: 'all' },
        { id: todolistId_2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "TS", isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Bread", isDone: true },
        ]
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(taskId, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchTodolist(changeFilterAC(todolistId, filter))
    }

    const changeStatusTask = (taskId: string, status: boolean, todolistId: string) => {
        dispatchTasks(changeTaskAC(taskId, status, todolistId))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolist(removeTodoAC(todolistId))
    }

    const addNewTodoList = (todolistValue: string) => {
        const newTodoId = v1();
        dispatchTodolist(addNewTodoListAC(todolistValue, newTodoId))
        dispatchTasks(addNewTodoListTaskAC(newTodoId))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskAC(todolistId, taskId, title))
    };

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchTodolist(updateTodolistAC(todolistId, title))
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
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
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
