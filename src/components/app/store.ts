import { UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"

import { appReducer, appSlice } from "./appSlice"
import { todoListReducer, todoListSlice } from "../features/todolists/model/todolistsSlice"
import { authReducer, authSlice } from "components/features/auth/model/authSlice"
import { tasksReducer, tasksSlice } from "components/features/todolists/model/tasksSlice"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todoListSlice.name]: todoListReducer,
    [authSlice.name]: authReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>