import { ChangeEvent } from "react";
import { FilterValuesType } from "../../App";
import { Button } from "../Button/Button";

import '../../App.css'
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusTask: (taskId: string, status: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatusTask,
    filter,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist
}: TodoListPropsType) => {

    const deleteTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTodoTitleHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <div>
            <EditableSpan value={title} onChange={changeTodoTitleHandler} />
            <Button title="x" onClick={deleteTodolistHandler} />
            <AddItemForm addItem={addTaskHandler} />

            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <ul>

                    {tasks.map((task) => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        }

                        const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatusTask(task.id, e.currentTarget.checked, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }
                        return (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeStatusTaskHandler} />
                                <EditableSpan className={task.isDone ? "is-done" : ''} value={task.title} onChange={changeTaskTitleHandler} />
                                <Button title="x" onClick={removeTaskHandler} />
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'filter-btn-active' : ""} title={'All'} onClick={() => { changeFilter('all', todolistId) }} />
                <Button className={filter === 'active' ? 'filter-btn-active' : ""} title={'Active'} onClick={() => { changeFilter('active', todolistId) }} />
                <Button className={filter === 'completed' ? 'filter-btn-active' : ""} title={'Completed'} onClick={() => { changeFilter('completed', todolistId) }} />
            </div>

        </div>
    )
}