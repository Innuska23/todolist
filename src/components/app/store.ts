import { UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"

import { appReducer } from "./appSlice"
import { todoListReducer } from "../features/todolists/model/todolistsSlice"
import { authReducer } from "components/features/auth/model/authSlice"
import { tasksReducer } from "components/features/todolists/model/tasksSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todoListReducer,
    auth: authReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
