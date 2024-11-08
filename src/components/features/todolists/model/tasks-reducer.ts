import { v1 } from "uuid"

import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { TaskType } from "../ui/Todolists/TodoList/TodoList"

export type RemoveTaskActionType = {
  type: "REMOVE_TASK"
  payload: {
    taskId: string
    todolistId: string
  }
}

export type AddTaskActionType = {
  type: "ADD_TASK"
  payload: {
    title: string
    todolistId: string
  }
}

export type ChangeStatusActionType = {
  type: "CHANGE_STATUS"
  payload: {
    taskId: string
    status: boolean
    todolistId: string
  }
}

export type UpdateTaskActionType = {
  type: "UPDATE_TASK"
  payload: {
    todolistId: string
    taskId: string
    title: string
  }
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const { taskId, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
      }
    }
    case "ADD_TASK": {
      const { title, todolistId } = action.payload
      const newTask = {
        id: v1(),
        title,
        isDone: false,
      }
      return {
        ...state,
        [todolistId]: [newTask, ...state[todolistId]],
      }
    }
    case "CHANGE_STATUS": {
      const { taskId, status, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, isDone: status } : t)),
      }
    }
    case "UPDATE_TASK": {
      const { todolistId, taskId, title } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, title } : task)),
      }
    }
    case "ADD_TODOLIST": {
      return {
        ...state,
        [action.payload.id]: [],
      }
    }
    case "REMOVE_TODOLIST": {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }
    default:
      return state
  }
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskACType = ReturnType<typeof changeTaskAC>
export type updateTaskACType = ReturnType<typeof updateTaskAC>
export type addNewTodoListTaskACType = ReturnType<typeof addNewTodoListTaskAC>

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const
}

export const changeTaskAC = (payload: { taskId: string; status: boolean; todolistId: string }) => {
  return {
    type: "CHANGE_STATUS",
    payload,
  } as const
}

export const updateTaskAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}

export const addNewTodoListTaskAC = (payload: { id: string }) => {
  return {
    type: "ADD_TODOLIST_NEW",
    payload,
  } as const
}
