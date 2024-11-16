import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { AppDispatch, RootState } from "components/app/store"
import { TaskStatus } from "components/common/enums"

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusActionType = ReturnType<typeof changeTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type AddNewTodoListTaskACType = ReturnType<typeof addNewTodoListTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksACType

export type TasksStateType = {
  [key: string]: Array<DomainTask>
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
      const { task } = action.payload
      const newTask: DomainTask = task
      return {
        ...state,
        [task.todoListId]: [newTask, ...state[task.todoListId]],
      }
    }
    case "CHANGE_STATUS": {
      const { taskId, status, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, status } : t)),
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
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    default:
      return state
  }
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const
}

export const changeTaskAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
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

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.removeTask(args).then(() => {
    dispatch(removeTaskAC(args))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const changeTaskStatusTC =
  (arg: { taskId: string; status: TaskStatus; todolistId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskId, todolistId, status } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      }

      tasksApi.changeTaskStatus({ taskId, todolistId, model }).then(() => {
        dispatch(changeTaskAC(arg))
      })
    }
  }
