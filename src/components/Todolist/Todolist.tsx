import { FilterValuesType } from "../../App";
import { Button } from "../Button/Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({ title, tasks, removeTask, changeFilter }: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={'+'} />
            </div>

            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                <Button title="x" onClick={() => { (removeTask(task.id)) }} />
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={'All'} onClick={() => { changeFilter('all') }} />
                <Button title={'Active'} onClick={() => { changeFilter('active') }} />
                <Button title={'Completed'} onClick={() => { changeFilter('completed') }} />
            </div>
        </div>
    )
}