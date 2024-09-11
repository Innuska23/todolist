import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";
import { Button } from "../Button/Button";

import '../../App.css'

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
    removeTodolist
}: TodoListPropsType) => {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');

    const validateInput = (value: string): string => {
        if (value.trim() === '') return 'Title is required';
        if (value.trim().length > 10) return 'Input should not exceed 10 characters';
        return '';
    }

    const changeTaskTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        setInputError(validateInput(value));
    }

    const handleAddTask = () => {
        const trimmedValue = inputValue.trim();
        const error = validateInput(trimmedValue);
        if (!error) {
            addTask(trimmedValue, todolistId);
            setInputValue('');
        } else {
            setInputError(error);
        }
    }

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    const deleteTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <h3>{title} <Button title="x" onClick={deleteTodolistHandler} /></h3>

            <div>
                <input
                    value={inputValue}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    className={inputError ? "error" : ''} />
                < Button
                    title={'+'}
                    onClick={handleAddTask}
                    disabled={!!validateInput(inputValue)
                    }

                />
            </div>

            {inputError && (
                <div style={{ color: 'red', marginTop: '8px' }}>{inputError}</div>
            )}

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
                        return (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeStatusTaskHandler} />
                                <span className={task.isDone ? "is-done" : ''}>{task.title}</span>
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