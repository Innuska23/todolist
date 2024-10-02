import { v1 } from 'uuid'

import { TaskType } from '../components/TodoList/TodoList'

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeStatusActionType = {
    type: 'CHANGE_STATUS'
    payload: {
        taskId: string
        status: boolean
        todolistId: string
    }
}

export type UpdateTaskActionType = {
    type: 'UPDATE_TASK'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}
export type AddTodoListActionType = {
    type: 'ADD_TODOLIST_NEW'
    payload: {
        id: string
    }
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | UpdateTaskActionType
    | AddTodoListActionType

type TasksStateType = {
    [key: string]: Array<TaskType>
}

const todolistId_1 = v1();
const todolistId_2 = v1()

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const { taskId, todolistId } = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }
        case 'ADD_TASK': {
            const { title, todolistId } = action.payload
            const newTask = {
                id: v1(),
                title,
                isDone: false
            }
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            }
        }
        case 'CHANGE_STATUS': {
            const { taskId, status, todolistId } = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, isDone: status } : t)
            }
        }
        case 'UPDATE_TASK': {
            const { todolistId, taskId, title } = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map((task) => task.id === taskId ? { ...task, title } : task)
            }
        }
        case 'ADD_TODOLIST_NEW': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        default:
            return state
    }
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export type changeTaskACType = ReturnType<typeof changeTaskAC>

export const changeTaskAC = (taskId: string, status: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            taskId,
            status,
            todolistId
        }
    } as const
}

export type updateTaskACType = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}

export type addNewTodoListTaskACType = ReturnType<typeof addNewTodoListTaskAC>

export const addNewTodoListTaskAC = (id: string) => {
    return {
        type: 'ADD_TODOLIST_NEW',
        payload: {
            id
        }
    } as const
}