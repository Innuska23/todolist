import { combineReducers, UnknownAction } from "redux"

import { appReducer } from "./appSlice"
import { tasksReducer } from "../features/todolists/model/tasksSlice"
import { todoListReducer } from "../features/todolists/model/todolistsSlice"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "components/features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListReducer,

  auth: authReducer,

  app: appReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

