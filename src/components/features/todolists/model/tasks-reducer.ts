import { AddTodolistActionType, ClearTodosDataACActionType, RemoveTodoACType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { AppDispatch, RootState } from "components/app/store"
import { ResultCode, TaskStatus } from "components/common/enums"
import { setAppStatusAC } from "components/app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "components/common/utils"
import { DomainTask, DomainTaskUi } from "../api/tasksApi.types"

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeStatusActionType = ReturnType<typeof changeTaskAC>
// export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type AddNewTodoListTaskACType = ReturnType<typeof addNewTodoListTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type SetTaskLoadingActionType = ReturnType<typeof setTaskLoadingAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  // | ChangeStatusActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodoACType
  | SetTasksACType
  | SetTaskLoadingActionType
  // | UpdateTaskNewAC
  | ClearTodosDataACActionType

export type TasksStateType = {
  [key: string]: Array<DomainTaskUi>
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
      const newTask: DomainTaskUi = { ...task, isLoading: false }
      return {
        ...state,
        [task.todoListId]: [newTask, ...state[task.todoListId]],
      }
    }
    // case "CHANGE_STATUS": {
    //     const { taskId, status, todolistId } = action.payload
    //     if (!state[todolistId]) return state
    //     return {
    //         ...state,
    //         [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, status } : t)),
    //     }
    // }
    // case "UPDATE_TASK": {
    //     const { todolistId, taskId, title } = action.payload
    //     return {
    //         ...state,
    //         [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, title } : task)),
    //     }
    // }
    case "ADD_TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      }
    }
    case "REMOVE_TODOLIST": {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }
    case "SET_TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks.map((task) => ({
        ...task,
        isLoading: false,
      }))
      return stateCopy
    }
    case "UPDATE_TASK": {
      const { todolistId, taskId, updates } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
      }
    }
    case "IS_LOADING_TASK": {
      const { taskId, todolistId, isLoading } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, isLoading } : task)),
      }
    }
    case "CLEAR_TODOS_DATA": {
      return {}
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

// export const changeTaskAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
//     return {
//         type: "CHANGE_STATUS",
//         payload,
//     } as const
// }

export const addNewTodoListTaskAC = (payload: { id: string }) => {
  return {
    type: "ADD_TODOLIST_NEW",
    payload,
  } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET_TASKS",
    payload,
  } as const
}

export const updateTaskAC = (payload: { todolistId: string; taskId: string; updates: Partial<DomainTask> }) =>
  ({
    type: "UPDATE_TASK",
    payload,
  }) as const

export const setTaskLoadingAC = (payload: { todolistId: string; taskId: string; isLoading: boolean }) =>
  ({
    type: "IS_LOADING_TASK",
    payload,
  }) as const

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setAppStatusAC("succeeded"))
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  const { taskId, todolistId } = args
  dispatch(setAppStatusAC("loading"))
  dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: true }))

  tasksApi
    .removeTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(args))
        dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: false }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
      dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: false }))
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTaskAC({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const updateTaskTC =
  (arg: { todolistId: string; taskId: string; updates: Partial<DomainTask> }) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const { taskId, todolistId, updates } = arg

      const allTasksFromState = getState().tasks
      const tasksForCurrentTodolist = allTasksFromState[todolistId]

      if (!tasksForCurrentTodolist) {
        console.error(`No tasks found for todolistId: ${todolistId}`)
        return
      }

      const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

      if (!task) {
        console.error(`Task with id: ${taskId} not found`)
        return
      }

      dispatch(setAppStatusAC("loading"))
      dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: true }))
      const updatedTask = { ...task, ...updates }

      tasksApi
        .changeTaskStatus({ taskId, todolistId, model: updatedTask })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(updateTaskAC({ todolistId, taskId, updates }))
            dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: false }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((err) => {
          handleServerNetworkError(err, dispatch)
          dispatch(setTaskLoadingAC({ taskId, todolistId, isLoading: false }))
        })
    }

export const changeTaskStatusTC =
  (arg: { taskId: string; status: TaskStatus; todolistId: string }) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(
        updateTaskTC({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          updates: { status: arg.status },
        }),
      )
    }

export const updateTaskTitleTC =
  (arg: { todolistId: string; taskId: string; title: string }) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(
        updateTaskTC({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          updates: { title: arg.title },
        }),
      )
    }
