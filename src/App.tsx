import { useState } from 'react';
import { TaskType, TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "TS", isDone: false },
    ])

    const removeTask = (taskId: string) => {
        const newTask = tasks.filter(t => t.id !== taskId);
        setTasks(newTask);
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const changeStatusTask = (taskId: string, status: boolean) => {
        const changeTask = tasks.map(t => t.id === taskId ? { ...t, isDone: status } : t)
        setTasks(changeTask)
    }

    return (
        <div className='App'>

            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatusTask={changeStatusTask}
                filter={filter}
            />

        </div>
    )
}

export default App;
