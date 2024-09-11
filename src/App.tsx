import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { v1 } from 'uuid';

import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

function App() {
    const todolistId_1 = v1();
    const todolistId_2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId_1, title: 'What to learn', filter: 'all' },
        { id: todolistId_2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState({
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

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter } : el))
    }

    const changeStatusTask = (taskId: string, status: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: status } : t)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    return (
        <div className='App'>
            
            {todolists.map((tl) => {
                let tasksForTodoList = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                }

                if (tl.filter === "completed") {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                }

                return <TodoList
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatusTask={changeStatusTask}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    )
}

export default App;
