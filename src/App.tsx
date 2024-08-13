import './App.css';

import { TaskType, Todolist } from './components/Todolist/Todolist';

const task1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "TS", isDone: false },
]

const task2: Array<TaskType> = [
    { id: 1, title: "Milk", isDone: false },
    { id: 2, title: "Book", isDone: false },
    { id: 3, title: "Sugar", isDone: false },
]

const task3: Array<TaskType> = []

function App() {
    return (
        <div className='App'>
            <Todolist title="What to learn" tasks={task1} />
            <Todolist title="What to buy" tasks={task2} />
            <Todolist title="Books" tasks={task3} />
        </div>
    )
}

export default App;
