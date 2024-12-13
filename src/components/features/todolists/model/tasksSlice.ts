import { createSlice } from "@reduxjs/toolkit"

import { _tasksApi } from "../api/tasksApi"
import { AppDispatch, RootState } from "components/app/store"
import { ResultCode, TaskStatus } from "components/common/enums"
import { setAppStatus } from "components/app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "components/common/utils"
import { DomainTask, DomainTaskUi } from "../api/tasksApi.types"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { clearData } from "components/common/actions/clearData"

export type TasksStateType = {
  [key: string]: Array<DomainTaskUi>
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks.map((task) => ({
        ...task,
        isLoading: false,
      }))
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ todolistId: string; task: DomainTask }>((state, action) => {
      state[action.payload.todolistId].unshift({
        ...action.payload.task,
        isLoading: false,
      })
    }),
    updateTask: create.reducer<{ todolistId: string; taskId: string; model: Partial<DomainTaskUi> }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model }
        }
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearData, (state) => {
        return {};
      });
  },
  selectors: {
    selectTask: (state) => state,
  },
})

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const { selectTask } = tasksSlice.selectors

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }))
    const tasks = res.data.items
    dispatch(setTasks({ todolistId, tasks }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))

  _tasksApi
    .removeTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(args))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTask({ todolistId: arg.todolistId, task: res.data.data.item }))
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

      dispatch(setAppStatus({ status: "loading" }))
      const updatedTask = { ...task, ...updates }

      _tasksApi
        .changeTaskStatus({ taskId, todolistId, model: updatedTask })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: "succeeded" }))
            dispatch(updateTask({ todolistId, taskId, model: updates }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((err) => {
          handleServerNetworkError(err, dispatch)
        })
    }

export const changeTaskStatusTC =
  (arg: { taskId: string; status: TaskStatus; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(
      updateTaskTC({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        updates: { status: arg.status },
      }),
    )
  }

export const updateTaskTitleTC =
  (arg: { todolistId: string; taskId: string; title: string }) => (dispatch: AppDispatch) => {
    dispatch(
      updateTaskTC({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        updates: { title: arg.title },
      }),
    )
  }
