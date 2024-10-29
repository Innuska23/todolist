import { TodolistType } from "../../../../../../app/App"
import { List } from "@mui/material"
import { Task } from "./Task/Task"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { selectTask } from "../../../../model/tasksSelectors"

type TasksType = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: TasksType) => {

    const tasks = useAppSelector(selectTask)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map(task => {
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                todolist={todolist} />
                        )
                    })}
                </List>
            )}
        </>
    )
}