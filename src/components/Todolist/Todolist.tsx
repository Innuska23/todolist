import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";
import { Button } from "../Button/Button";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = ({ title, tasks, removeTask, changeFilter, addTask }: TodoListPropsType) => {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');

    const validateInput = (value: string): string => {
        if (value.trim() === '') return 'Input cannot be empty';
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
            addTask(trimmedValue);
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

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler} />
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
                            removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title="x" onClick={removeTaskHandler} />
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