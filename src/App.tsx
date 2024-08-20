import { useState } from 'react';
import './App.css';

import { TaskType, Todolist } from './components/Todolist/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "TS", isDone: false },
    ])

    const removeTask = (taskId: number) => {
        const newTask = tasks.filter(t => t.id !== taskId);
        setTasks(newTask);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }


    return (
        <div className='App'>

            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter} />

        </div>
    )
}

export default App;
